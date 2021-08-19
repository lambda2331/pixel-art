import React, { useEffect, useRef, useState } from 'react'
import { Pressable, Platform, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

type ImageLoadProps = {
  downloadImageCallback: () => Promise<void>
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
})

async function sendLoadImageNotification(expoPushToken: string) {
  await Notifications.scheduleNotificationAsync({
    content: {
      sound: 'default',
      body: 'Изображение успешно скачано в вашу галерею'
    },
    trigger: { seconds: 1 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

export const ImageLoad: React.FC<ImageLoadProps> = ({ downloadImageCallback }) => {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token as string));
  }, []);
  
  const handleLoadImage = async () => {
    await downloadImageCallback()
    await sendLoadImageNotification(expoPushToken)
  }

  return (
    <Pressable style={styles.button} onPress={handleLoadImage}>
      <Ionicons name="download" size={25} color='#FFFFFF' />
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