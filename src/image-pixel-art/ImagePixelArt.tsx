import React, { Fragment, useEffect, useState } from "react"
import { StyleSheet, Image, Dimensions, View, Text } from "react-native"
import { AppStorage } from "../store"
import { hexToRgb, postRequest, RGB } from "../utils"
import { ImageLoad } from "./ImageLoad"
import { ImageSwitcher } from "./ImageSwitcher"
import * as MediaLibrary from 'expo-media-library';
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';
import { LogoSpinner } from "../LogoSpinner"
import * as FileSystem from 'expo-file-system';
import { ImageReload } from "./ImageReload"

type ImagePixelArt = {
  source: string | null
}

type PixelArtResponse = {
  pixelArt: string
}

const widnowWidth = Dimensions.get('window').width
const widnowHeight = Dimensions.get('window').height

export const ImagePixelArt: React.FC<ImagePixelArt> = ({ source }) => {
  const [pixelArt, setPixelArt] = useState<string | null>(null)
  const [showOriginal, setShowOriginalFlag] = useState<boolean>(false)
  const { promiseInProgress } = usePromiseTracker()

  useEffect(() => {
    if (source) {
      makeApiCall()
      return
    }

    setPixelArt(null)
  }, [source])

  const convertToPixelArt = async () => {
    try {
      const scale = await AppStorage.getData('scale')
      const colors = await AppStorage.getObjectData<string[]>('colors')
      const palette = colors && colors.map(color => {
        const { r, g, b } = hexToRgb(color) as RGB

        return [r,g,b]
      })

      const data = {
        base64: source,
        palette,
        scale: scale ? scale : 8
      }

      const result = await postRequest<PixelArtResponse>('https://pixel-art-server-hrodno.herokuapp.com/generate-art', {
        method: 'POST',
        headers: {
          Accept: "application/json",
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      setPixelArt(result.pixelArt)
    } catch (e) {
      console.log(e)
    }
  }

  const makeApiCall = () => {
    trackPromise(convertToPixelArt())
  }

  const onTouchStart = () => {
    setShowOriginalFlag(true)
  }

  const onTouchEnd = () => {
    setShowOriginalFlag(false)
  }

  const downloadImage = async() => {
    const base64Code = pixelArt?.replace('data:image/octet-stream;base64,', '') as string

    const filename = FileSystem.documentDirectory + "PixelArt.png"
    await FileSystem.writeAsStringAsync(filename, base64Code, {
      encoding: FileSystem.EncodingType.Base64,
    })

    return await MediaLibrary.saveToLibraryAsync(filename)
  }

  const reloadImage = async () => {
    await setPixelArt(null)
    await makeApiCall()
  }

  const imageUri: string = (showOriginal ? source : pixelArt) as string

  return (
    <View style={styles.container}>
      {!source && <Text style={styles.text}>PixelArt</Text>}
      {promiseInProgress && <LogoSpinner/> }
      {pixelArt && (
        <Fragment>
          <Image source={{ uri: imageUri }} resizeMode="contain" style={styles.image} />
          <View style={styles.buttons}>
            <ImageReload reloadCallback={reloadImage}/>
            <ImageLoad downloadImageCallback={downloadImage}/>
            <ImageSwitcher onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} />
          </View>
        </Fragment>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: widnowHeight - 200,
    width: widnowWidth - 50,
    borderWidth: 1,
    borderColor: 'black',
    shadowColor: 'gray',
    shadowRadius: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginBottom: 10
  },
  text: {
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 20
  },
  image: {
    height: widnowHeight - 150,
    width: widnowWidth - 50,
  },
  buttons: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 10,
    right: 5,
    width: 150,
    justifyContent: 'space-around'
  }
})
