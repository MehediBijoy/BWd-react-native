import React from 'react'
import {Icon, useTheme} from '@rneui/themed'
import Clipboard from '@react-native-clipboard/clipboard'
import {Pressable, StyleProp, ViewStyle} from 'react-native'
import Animated, {ZoomIn, ZoomOut} from 'react-native-reanimated'

import {Colors} from 'types'

const SIZES = {
  sm: 25,
  md: 30,
  lg: 35,
  xl: 40,
}

type CopyButtonProps = {
  toCopy: string
  animateTime?: number
  size?: keyof typeof SIZES
  enterIconColor?: Colors
  exitIconColor?: Colors
  style?: StyleProp<ViewStyle>
}

const CopyButton: React.FC<CopyButtonProps> = ({
  toCopy,
  style,
  animateTime = 1200,
  size = 'sm',
  enterIconColor = 'textPrimary',
  exitIconColor = 'primary',
}) => {
  const {theme} = useTheme()
  const [onEnter, setOnEnter] = React.useState(false)
  const [isCopied, setIsCopied] = React.useState(false)

  const performCopy = () => {
    setIsCopied(true)
    Clipboard.setString(toCopy)
    setTimeout(() => setIsCopied(false), animateTime)
  }

  React.useEffect(() => {
    setOnEnter(true)
  }, [])

  return (
    <Pressable onPress={performCopy} style={style}>
      <Animated.View
        key={Number(isCopied)}
        entering={onEnter ? ZoomIn.delay(100) : undefined}
        exiting={ZoomOut.delay(100)}
      >
        {isCopied ? (
          <Icon name='check' size={SIZES[size]} color={theme.colors[exitIconColor]} />
        ) : (
          <Icon
            type='ionicon'
            name='copy-outline'
            size={SIZES[size]}
            color={theme.colors[enterIconColor]}
          />
        )}
      </Animated.View>
    </Pressable>
  )
}

export default CopyButton
