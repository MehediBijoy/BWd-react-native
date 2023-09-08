import * as React from 'react'
import {makeStyles} from '@rneui/themed'
import {Animated, Easing, View, TouchableWithoutFeedback} from 'react-native'

type SwitchProps = {
  active?: boolean
  onChange?: () => void
}

const Switch = ({active, onChange}: SwitchProps) => {
  const styles = useStyles({active})
  const animated = React.useRef(new Animated.Value(0)).current

  Animated.timing(animated, {
    toValue: active ? 1 : 0,
    duration: 200,
    easing: Easing.inOut(Easing.ease),
    useNativeDriver: false,
  }).start()

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        onChange && onChange()
      }}
    >
      <View style={[styles.container]}>
        <Animated.View
          style={[
            styles.thumb,
            {
              marginLeft: animated.interpolate({
                inputRange: [0, 1],
                outputRange: [3, 22],
              }),
            },
          ]}
        />
      </View>
    </TouchableWithoutFeedback>
  )
}

type StyledProps = {active?: boolean}

const useStyles = makeStyles(({colors}, {active}: StyledProps) => ({
  container: {
    width: 50,
    height: 30,
    marginLeft: 3,
    borderRadius: 16,
    justifyContent: 'center',
    backgroundColor: active ? colors.tertiaryLight : colors.grey5,
  },
  thumb: {
    width: 25,
    height: 25,
    backgroundColor: colors.white,
    borderRadius: 12.5,
    shadowColor: colors.textPrimary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    elevation: 1.5,
  },
}))

export default Switch
