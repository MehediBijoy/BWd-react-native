import {Icon, makeStyles} from '@rneui/themed'
import {Text, View, TextProps} from 'react-native'

export type MessageBoxProps = {
  message: string
  messageStyles?: TextProps
  icon: string
  iconType: string
  iconBgColor: string
}

const useStyles = makeStyles(({colors}) => ({
  container: {
    flexDirection: 'row',
    gap: 10,
  },
  messageStyles: {
    fontSize: 16,
    color: colors.white,
  },
}))

const MessageBox = ({message, icon, iconType, iconBgColor, messageStyles}: MessageBoxProps) => {
  const styles = useStyles()
  return (
    <View style={styles.container}>
      <Icon name={icon} type={iconType} color={iconBgColor} size={30} />
      <Text style={[styles.messageStyles, messageStyles]}>{message}</Text>
    </View>
  )
}
export default MessageBox
