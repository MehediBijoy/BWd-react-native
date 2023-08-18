import {View} from 'react-native'
import {Button, Text, makeStyles, useTheme} from '@rneui/themed'
import LinearGradient from 'react-native-linear-gradient'

import Input from 'components/Input'
import SafeAreaView from 'components/SafeAreaView'
import ContainContainer from 'components/ContentContainer'

const useStyles = makeStyles(() => ({
  container: {
    marginTop: 50,
    width: '100%',
    maxWidth: 400,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  innerContainer: {
    display: 'flex',
    rowGap: 10,
  },
}))

const Login = () => {
  const {theme} = useTheme()
  const styles = useStyles()

  return (
    <SafeAreaView>
      <ContainContainer>
        <LinearGradient
          colors={[theme.colors.tertiary, theme.colors.tertiaryDark]}
          style={styles.container}
        >
          <View style={styles.innerContainer}>
            <Text h1 h1Style={{color: theme.colors.white, textAlign: 'center'}}>
              Login
            </Text>
            <Input placeholder='Email' />
            <Input placeholder='Password' />
            <Button title='Login' />
          </View>
        </LinearGradient>
      </ContainContainer>
    </SafeAreaView>
  )
}

export default Login
