import {makeStyles} from '@rneui/themed'
import {Text, View, TextProps, ViewProps} from 'react-native'

export type ListBoxProps = {
  data: string[]
  textStyles?: TextProps
  containerStyle?: ViewProps
}

const useStyles = makeStyles(({colors}) => ({
  containerStyle: {
    rowGap: 5,
  },
  textStyles: {
    color: colors.white,
  },
}))

const ListBox = ({data, textStyles, containerStyle}: ListBoxProps) => {
  const styles = useStyles()
  return (
    <View style={[styles.containerStyle, containerStyle]}>
      {data.map((value, index) => (
        <Text key={index} style={[styles.textStyles, textStyles]}>
          {'\u2022 '}
          {value}
        </Text>
      ))}
    </View>
  )
}
export default ListBox
