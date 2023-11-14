import {View} from 'react-native'
import {Text, LinearProgress, makeStyles} from '@rneui/themed'

import LogoIcon from 'images/bwg-logo.svg'

const Splash = () => {
  const styles = useStyles()
  return (
    <View style={styles.container}>
      <LogoIcon height={132.8} width={130} />
      <Text style={{fontSize: 36.5, marginTop: 14}}>Bretton Woods</Text>
      <Text style={{fontSize: 37, marginTop: -7.5, marginLeft: 2}}>
        <Text style={{fontSize: 37, fontStyle: 'italic'}}>digital</Text> Gold
      </Text>
      <LinearProgress style={styles.linear} color={styles.color.color} />
    </View>
  )
}

export default Splash

const useStyles = makeStyles(({colors}) => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.textReverse,
  },
  linear: {
    marginTop: 20,
    width: 220,
    height: 7,
    borderRadius: 10,
  },
  color: {
    color: colors.tertiary,
  },
}))
