import React from "react"
import * as ImagePicker from 'expo-image-picker';
import { BaseButton } from "./BaseButton";

type PickImageBtnProps = {
  pickImageCallback: (uri: string | null) => void
}

export const PickImageBtn: React.FC<PickImageBtnProps> = ({ pickImageCallback }) => {
  const pickImage = async () => {
    pickImageCallback(null)
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 0.5,
      base64: true
    });

    if (!result.cancelled) {
      pickImageCallback(`data:image/jpeg;base64,${result.base64}`);
    }
  };

  return (
    <BaseButton text={'Загрузить изображение'} onPress={pickImage}/>
  )
}
