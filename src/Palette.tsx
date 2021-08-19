import React from "react"
import { View, StyleSheet, Pressable } from "react-native"

type PaletteProps = {
  colors: string[],
  onColorSelect: (color: string) => void,
  width: number
}

const predefinedPalatte = [
  '#4D4D4D', '#999999', '#FFFFFF', '#F44E3B', '#FE9200', '#FCDC00', '#DBDF00', '#A4DD00', '#68CCCA', '#73D8FF', '#AEA1FF', '#FDA1FF', '#808080', '#cccccc', '#D33115', '#E27300', '#FCC400', '#B0BC00', '#68BC00', '#16A5A5', '#009CE0', '#7B64FF', '#FA28FF', '#000000', '#666666', '#B3B3B3', '#9F0500', '#C45100', '#FB9E00', '#808900', '#194D33', '#0C797D', '#0062B1', '#653294', '#AB149E'
]

export const Palette: React.FC<PaletteProps> = ({ colors, onColorSelect, width }) => {
  const isColorSelected = (color: string) => {
    return colors.includes(color)
  }

  const generateColorBoxStyles = (color: string) => {
    let result =  {
      backgroundColor: color,
      ...styles.color,
    }

    return result
  }

  const isWhiteColor = (color: string) => {
    return color === '#FFFFFF'
  }

  return (
    <View style={{...styles.container, width }}>
      {
        predefinedPalatte.map(color => {
          return (
            <Pressable key={color} onPress={() => onColorSelect(color)} style={generateColorBoxStyles(color)}>
              {isColorSelected(color) && <View style={{ ...styles.dot, backgroundColor: isWhiteColor(color) ? 'black' : 'white' }}/> }
            </Pressable>
          )
        })
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  color: {
    width: 30,
    height: 30,
    margin: 10,
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center'
  },
  dot: {
    borderRadius: 50,
    width: 10,
    height: 10
  },
  active: {
    borderWidth: 3,
    shadowColor: 'black'
  }
})