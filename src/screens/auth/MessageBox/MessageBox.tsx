import {View, TextProps, ViewStyle} from 'react-native'
import {Icon, Text, makeStyles, IconProps} from '@rneui/themed'

export type MessageBoxProps = {
  message: string
  messageStyles?: TextProps
  containerStyles?: ViewStyle
} & IconProps

const useStyles = makeStyles(({colors}) => ({
  container: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  messageStyles: {
    fontSize: 16,
    color: colors.white,
  },
}))

const MessageBox = ({message, messageStyles, containerStyle, ...rest}: MessageBoxProps) => {
  const styles = useStyles()
  return (
    <View style={[styles.container, containerStyle]}>
      <Icon {...rest} />
      <Text style={[styles.messageStyles, messageStyles]}>{message}</Text>
    </View>
  )
}

export default MessageBox
