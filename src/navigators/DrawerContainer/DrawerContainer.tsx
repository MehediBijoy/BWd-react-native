import {
  DrawerItemList,
  DrawerContentScrollView,
  DrawerContentComponentProps,
} from '@react-navigation/drawer'
import {View, Pressable} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import {Text, makeStyles, useTheme, Icon} from '@rneui/themed'

import Logo from 'components/Logo'
import {useOnUnauthorized} from 'hooks/api'

const DrawerContainer = (props: DrawerContentComponentProps) => {
  const {theme} = useTheme()
  const styles = useStyles()
  const onUnauthorized = useOnUnauthorized()

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView contentContainerStyle={{paddingTop: 0}} {...props}>
        <LinearGradient
          style={styles.header}
          colors={[theme.colors.tertiary, theme.colors.tertiaryDark]}
        >
          <Logo height={80} width={80} />
          <Text style={styles.title}>John Doe</Text>
          <Text style={styles.subTitle}>280 BWG</Text>
        </LinearGradient>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={styles.footer}>
        <Pressable style={styles.footerItem}>
          <Icon name='share' />
          <Text style={styles.footerText}>Refer a friend</Text>
        </Pressable>
        <Pressable style={styles.footerItem} onPress={() => onUnauthorized()}>
          <Icon name='logout' />
          <Text style={styles.footerText}>Logout</Text>
        </Pressable>
      </View>
    </View>
  )
}

const useStyles = makeStyles(({colors}) => ({
  header: {
    height: 200,
    paddingLeft: 20,
    paddingBottom: 20,
    rowGap: 5,
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textReverse,
  },
  subTitle: {
    fontSize: 13,
    color: colors.textReverse,
  },
  footer: {
    height: 100,
    paddingLeft: 20,
    paddingBottom: 20,
    paddingTop: 10,
    borderTopWidth: 2,
    borderRadius: 2,
    borderTopColor: colors.textPrimary,
    justifyContent: 'space-between',
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 7,
  },
  footerText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
}))

export default DrawerContainer
