import {StyleSheet, View, ViewStyle, StyleProp} from 'react-native'

import {Children} from 'types'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    paddingLeft: 10,
    paddingRight: 10,
  },
})

export type ContainerProps = {
  style?: StyleProp<ViewStyle>
} & Children

const ContainContainer = (props: ContainerProps) => (
  <View style={StyleSheet.flatten([styles.container, props.style])}>{props.children}</View>
)

export default ContainContainer
