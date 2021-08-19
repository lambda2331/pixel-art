import React, { useRef } from 'react';
import { StyleSheet, View, Image, Animated, Dimensions } from "react-native"

const width = Dimensions.get('screen').width

export const LogoSpinner: React.FC = () => {
  const [spinValue] = React.useState(new Animated.Value(0))

  React.useEffect(() => {
    runSpinnerAnimation()
  }, [])

  const runSpinnerAnimation = () => {
    Animated.loop( 
      Animated.sequence([ 
        Animated.delay(0), 
        Animated.timing( 
          spinValue, 
          { 
            toValue: 1, 
            duration: 1000, 
            useNativeDriver: true 
          }
        ), 
        Animated.timing(
          spinValue, 
          { 
            toValue: 0, 
            duration: 0, 
            useNativeDriver: true 
          }
        ),
      ]),
      {} 
    ).start(); 
  }

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  })

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('./../assets/pixel-art-logo.png')}
        resizeMode="contain"
        style={[styles.spinner, { transform: [{ rotate: spin }]}]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    width: width / 5,
    height: width / 5
  }
});