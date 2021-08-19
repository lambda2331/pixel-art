import React, { useEffect, useState } from 'react';
import { StyleSheet, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Art } from './src/Art';
import { Settings } from './src/settings/Settings';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

const Tab = createBottomTabNavigator();

export default function App() {
  const [image, setImage] = useState<string | null>(null);
  const [palette, setPalette] = useState<string[]>([])

  const [fontsLoaded] = useFonts({
    PressStart2P_400Regular
  })

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status: statusPicker } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        const { status: statusSave } = await MediaLibrary.requestPermissionsAsync()
        if (statusPicker !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }

        if (statusSave !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImageCallback = (uri: string) => {
    setImage(uri)
  };

  if (!fontsLoaded) {
    return null
  }


  return (
    <NavigationContainer>
      <StatusBar hidden={true} />
      <Tab.Navigator initialRouteName="Art" screenOptions={{tabBarActiveTintColor: '#FFFFFF', tabBarStyle: { backgroundColor: '#000000'}}}>
        <Tab.Screen
          name="Art"
          component={Art}
          options={{
            tabBarLabel: 'Арт',
            tabBarLabelStyle: {fontFamily: 'PressStart2P_400Regular', fontSize: 8},
            headerShown: false,
            tabBarIcon: ({ color, size }) => (<Ionicons name="pencil" size={size} color={color} />)
          }}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarLabel: 'Настройки',
            tabBarLabelStyle: {fontFamily: 'PressStart2P_400Regular', fontSize: 8},
            headerShown: false,
            tabBarIcon: ({ color, size }) => (<Ionicons name="settings" size={size} color={color} />)
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
