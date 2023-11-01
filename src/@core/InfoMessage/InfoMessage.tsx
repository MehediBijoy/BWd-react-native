import React from 'react'
import Color from 'color'
import {View} from 'react-native'
import {Text, Icon, useTheme, Colors, makeStyles} from '@rneui/themed'

import {alpha} from 'utils'

type Variant = 'success' | 'warning' | 'error' | 'info'
type InfoMessageProps = {
  variant?: Variant
  title?: string
  message: string
}

const getColor = (variant: Variant, colors: Colors) =>
  ({
    success: colors.success,
    warning: colors.warning,
    error: colors.error,
    info: colors.greyOutline,
  }[variant])

const getIcon = (variant: Variant, colors: Colors) =>
  ({
    success: <Icon name='check' size={25} color={colors.success} />,
    warning: <Icon type='ionicon' name='warning' size={25} color={colors.warning} />,
    error: <Icon type='ionicon' name='close' size={25} color={colors.error} />,
    info: <Icon type='ionicon' name='information' size={25} color={colors.greyOutline} />,
  }[variant])

const InfoMessage: React.FC<InfoMessageProps> = ({variant = 'info', title, message}) => {
  const {theme} = useTheme()
  const icon = getIcon(variant, theme.colors)
  const color = getColor(variant, theme.colors)
  const styles = useStyles()

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: alpha(color, 0.1),
        },
      ]}
    >
      <View
        style={{
          backgroundColor: alpha(color, 0.3),
          padding: 5,
          borderRadius: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {icon}
      </View>
      <View>
        {title && <Text style={{fontSize: 16, fontWeight: '600', color}}>{title}</Text>}
        <Text style={{color: Color(color).darken(0.2).toString()}}>{message}</Text>
      </View>
    </View>
  )
}

const useStyles = makeStyles(() => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,

    padding: 10,
    borderRadius: 10,
  },
}))

export default InfoMessage
