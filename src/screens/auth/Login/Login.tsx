import {Button, makeStyles} from '@rneui/themed'
import {View} from 'react-native'

const useStyles = makeStyles(theme => ({
  container: {
    height: '100%',
    width: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  text: {
    color: theme.colors.primary,
  },
}))

const Login = () => {
  const styles = useStyles()

  return (
    <View style={styles.container}>
      <Button title='click me..' />
    </View>
  )
}

export default Login
