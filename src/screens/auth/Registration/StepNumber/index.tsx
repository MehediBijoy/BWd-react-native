import {Text} from '@rneui/themed'
import {View, StyleProp, ViewStyle, StyleSheet} from 'react-native'

type StepNumberProps = {
  current: number
  total?: number
  containerStyle?: StyleProp<ViewStyle>
}

const StepNumber = ({current, total = 4, containerStyle}: StepNumberProps) => (
  <View style={[styles.container, containerStyle]}>
    <Text style={styles.title}>
      Step {current} Registration of {total}
    </Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
})

export default StepNumber
