import React from "react"
import * as ImagePicker from 'expo-image-picker';
import { BaseButton } from "./BaseButton";

type ResetImageBtnProps = {
  resetImageCallback: () => void
}

export const ResetImageBtn: React.FC<ResetImageBtnProps> = ({ resetImageCallback }) => {
  return (
    <BaseButton text={'Сбросить'} onPress={resetImageCallback}/>
  )
}