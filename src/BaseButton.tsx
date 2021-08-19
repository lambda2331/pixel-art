import React from "react"
import { Pressable, Text, StyleSheet, GestureResponderEvent } from "react-native"

type BaseButtonProps = {
  text: string,
  onPress: (e: GestureResponderEvent) => void
}

export const BaseButton: React.FC<BaseButtonProps> = ({ text, onPress }) => (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  )

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    elevation: 3,
    backgroundColor: 'black',
  },
  text: {
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 10,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  }
})