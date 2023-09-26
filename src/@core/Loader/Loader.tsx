import React, {useEffect, useRef} from 'react'
import {View, Animated, Easing} from 'react-native'
import {makeStyles} from '@rneui/themed'

const Loader: React.FC = () => {
  const animation = useRef(new Animated.Value(0)).current
  const styles = useStyles()

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ])
    ).start()
  }, [animation])

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.dot,
          {
            opacity: animation.interpolate({
              inputRange: [0, 1, 2, 3],
              outputRange: [0.9, 0.5, 0.9, 1],
            }),
          },
        ]}
      />
      <Animated.View
        style={[
          styles.dot,
          {
            opacity: animation.interpolate({
              inputRange: [0, 1, 2, 3],
              outputRange: [0.9, 0.5, 0.9, 1],
            }),
          },
        ]}
      />
      <Animated.View
        style={[
          styles.dot,
          {
            opacity: animation.interpolate({
              inputRange: [0, 1, 2, 3],
              outputRange: [0.9, 0.5, 0.9, 1],
            }),
          },
        ]}
      />
    </View>
  )
}

const useStyles = makeStyles(({colors}) => ({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 7,
    height: 7,
    backgroundColor: colors.primary,
    borderRadius: 10,
    marginHorizontal: 1,
  },
}))

export default Loader
