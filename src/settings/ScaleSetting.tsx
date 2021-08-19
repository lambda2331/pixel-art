import React, { useState } from 'react'
import Slider from '@react-native-community/slider';
import { StyleSheet } from "react-native"

const minValue = 5
const maxValue = 15
const step = 1

type ScaleSettingProps = {
  scale: number
  onValueChange: (value: number) => void,
  width: number
}

export const ScaleSetting: React.FC<ScaleSettingProps> = ({ scale, onValueChange, width = 100 }) => {
  return (
    <Slider 
      style={{ width, height: 40 }}
      minimumValue={minValue}
      maximumValue={maxValue}
      step={step}
      value={scale}
      minimumTrackTintColor="#000000"
      maximumTrackTintColor="#a5a5a5"
      onValueChange={onValueChange}
    />
  )
}