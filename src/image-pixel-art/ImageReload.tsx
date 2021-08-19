import React, { useState } from 'react'
import { Pressable, Text, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

type ImageSwitcherProps = {
  reloadCallback: () => void
}

export const ImageReload: React.FC<ImageSwitcherProps> = ({ reloadCallback }) => {
  return (
    <Pressable style={styles.button} onPress={reloadCallback}>
      <Ionicons name="reload" size={25} color='#FFFFFF' />
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