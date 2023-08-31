import React from 'react'
import {Animated, TouchableOpacity, useAnimatedValue} from 'react-native'

const Hamburger = () => {
  const animation = useAnimatedValue(0)
  const [isClicked, setIsClicked] = React.useState<boolean>(false)

  const startAnimation = () => {
    console.log(isClicked)
    Animated.spring(animation, {
      toValue: isClicked ? 1 : 0,
      useNativeDriver: true,
    }).start()
  }

  return (
    <TouchableOpacity
      onPress={() => {
        setIsClicked(!isClicked)
        startAnimation()
      }}
    >
      <Animated.View
        style={{
          height: 20,
          width: 25,
          rowGap: 5,
          //   transform: [
          //     {
          //       rotate: animation.interpolate({
          //         inputRange: [0, 1],
          //         outputRange: ['0deg', '360deg'],
          //       }),
          //     },
          //   ],
        }}
      >
        <Animated.View
          style={{
            height: 2,
            width: 25,
            backgroundColor: 'black',
            transform: [
              {
                rotate: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '135deg'],
                }),
              },
            ],
          }}
        />
        <Animated.View
          style={{
            height: 2,
            width: 25,
            backgroundColor: 'black',
            opacity: isClicked ? 1 : 0,
          }}
        />
        <Animated.View
          style={{
            height: 2,
            width: 25,
            backgroundColor: 'black',
            transform: [
              {
                rotate: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '-135deg'],
                }),
              },
            ],
          }}
        />
      </Animated.View>
    </TouchableOpacity>
  )
}

export default Hamburger
