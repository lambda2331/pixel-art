import React,{ useState } from "react"
import { View, StyleSheet } from "react-native"
import { usePromiseTracker } from "react-promise-tracker"
import { ImagePixelArt } from "./image-pixel-art/ImagePixelArt"
import { PickImageBtn } from "./PickImageBtn"
import { ResetImageBtn } from "./ResetImageBtn"
import { StartScreen } from "./StartScreen"

export const Art: React.FC = () => {
  const [image, setImage] = useState<string | null>(null)
  const { promiseInProgress } = usePromiseTracker()

  return (
    <View style={styles.container}>
      <StartScreen/>
      <ImagePixelArt source={image}/>
      {!image && <PickImageBtn pickImageCallback={(uri) => setImage(uri)}/> }
      {!promiseInProgress && image && <ResetImageBtn resetImageCallback={() => setImage(null)}/> }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingTop: 40
  }
})