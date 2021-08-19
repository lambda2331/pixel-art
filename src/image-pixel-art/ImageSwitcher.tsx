import React, { useState } from 'react'
import { Pressable, Text, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

type ImageSwitcherProps = {
  onTouchStart: () => void,
  onTouchEnd: () => void
}

export const ImageSwitcher: React.FC<ImageSwitcherProps> = ({ onTouchEnd, onTouchStart }) => {
  return (
    <Pressable style={styles.button} onTouchEnd={onTouchEnd} onTouchStart={onTouchStart}>
      <Ionicons name="images-sharp" size={25} color='#FFFFFF' />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
    width: 40,
    height: 40
  }
})