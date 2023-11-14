import {View} from 'react-native'
import {Text, LinearProgress, makeStyles} from '@rneui/themed'

import SplashImg1 from 'images/Splash_Screen4.png'
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
      {/* <Image source={SplashImg1} style={{width: '100%', height: '100%'}} /> */}
    </View>
  )
}

export default Splash

const useStyles = makeStyles(({colors}) => ({
  container: {
    flex: 1,
    // marginTop: 280,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1F4F5 ',
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
