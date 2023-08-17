import {StatusBar} from 'react-native'
import {SafeAreaProvider} from 'react-native-safe-area-context'

import Navigators from './Navigators/Navigators'
import ThemeProvider from './themes/ThemeProvider'

const App = () => (
  <SafeAreaProvider>
    <ThemeProvider>
      <StatusBar />
      <Navigators />
    </ThemeProvider>
  </SafeAreaProvider>
)

export default App
