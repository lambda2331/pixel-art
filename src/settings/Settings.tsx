import React,{ useEffect, useState } from "react"
import { View, Text, StyleSheet, Dimensions } from "react-native"
import { Palette } from "../Palette"
import { AppStorage } from "../store"
import { ScaleSetting } from "./ScaleSetting"

const widnowWidth = Dimensions.get('window').width

export const Settings: React.FC = () => {
  const [colors, setColors] = useState<string[]>(['#FFFFFF', '#000000'])
  const [scale, setScale] = useState<number>(8)

  const handleColorSelect = (color: string) => {
    if (colors.includes(color)) {
      setColors((prevValue) => prevValue.filter(item => item !== color))
      return
    }

    setColors((prevValue) => [...prevValue, color])
  }

  useEffect(() => {
    AppStorage.getObjectData<string[]>('colors').then(colors => {
      if (!colors) {
        AppStorage.storeObjectData('colors', colors)
        return
      }
      
      setColors(colors as string[])
    })

    AppStorage.getData('scale').then(value => {
      if (!value) {
        AppStorage.storeData('scale', scale.toString())
        return
      }
      
      value && setScale(+value)
    })
  }, [])

  useEffect(() => {
    AppStorage.storeData('scale', scale.toString())
  }, [scale])

  useEffect(() => {
    AppStorage.storeObjectData('colors', colors)
  }, [colors])

  return (
    <View style={styles.container}>
      <View style={{marginBottom: 20}}>
        <Text style={styles.text}>Масштаб: {scale}</Text>
        <ScaleSetting scale={scale} onValueChange={(value:number) => setScale(value)} width={widnowWidth - 100}/>
      </View>
      <View>
        <Text style={styles.text}>Палитра:</Text>
        <Palette colors={colors} onColorSelect={handleColorSelect} width={widnowWidth - 100}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 50
  },
  text: {
    fontFamily: 'PressStart2P_400Regular',
    marginBottom: 5
  }
})