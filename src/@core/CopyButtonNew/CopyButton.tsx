import React from 'react'
import {Pressable} from 'react-native'
import {Icon, useTheme} from '@rneui/themed'
import Clipboard from '@react-native-clipboard/clipboard'
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
}

const CopyButton: React.FC<CopyButtonProps> = ({
  toCopy,
  animateTime = 1200,
  size = 'md',
  enterIconColor = 'textPrimary',
  exitIconColor = 'primary',
}) => {
  const {theme} = useTheme()
  const [isCopied, setIsCopied] = React.useState(false)

  const performCopy = () => {
    setIsCopied(true)
    Clipboard.setString(toCopy)
    setTimeout(() => setIsCopied(false), animateTime)
  }

  return (
    <Pressable onPress={performCopy}>
      <Animated.View
        key={Number(isCopied)}
        entering={ZoomIn.delay(100)}
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
