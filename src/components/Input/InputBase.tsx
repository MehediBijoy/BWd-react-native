import {ViewStyle, ImageStyle, StyleSheet, TextStyle, ColorValue} from 'react-native'

interface Style {
  container: ViewStyle
  iconContainerStyle: ViewStyle
  iconImageStyle: ImageStyle
}

export const _textInputStyle = (borderColor: ColorValue): TextStyle => ({
  height: 50,
  width: '100%',
  borderWidth: 1,
  paddingLeft: 16,
  borderRadius: 8,
  paddingRight: 16,
  borderColor: borderColor,
  justifyContent: 'center',
  backgroundColor: '#eceef5',
  color: '#000',
})

export default StyleSheet.create<Style>({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainerStyle: {
    right: 16,
    position: 'absolute',
  },
  iconImageStyle: {
    height: 20,
    width: 20,
    tintColor: '#b5b9bb',
  },
})
