import {SafeAreaView, StatusBar} from 'react-native'

import ThemeProvider from './themes/ThemeProvider'
import Login from './screens/auth/Login/Login'

const App = () => (
  <ThemeProvider>
    <SafeAreaView>
      <StatusBar />
      <Login />
    </SafeAreaView>
  </ThemeProvider>
)

export default App
