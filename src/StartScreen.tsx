import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Animated, Modal, Text, ModalProps } from "react-native"

export const StartScreen: React.FC<{}> = () => {
  const [fadeIn] = useState(new Animated.Value(0))
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true
    }).start(() => {
      Animated.timing(fadeIn, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true
      }).start(() => {
        setVisible(false)
      })
    });
  }, [])

  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        <Animated.Text style={{ opacity: fadeIn, ...styles.text }}>PixelArt</Animated.Text>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 20
  }
})