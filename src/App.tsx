import {StatusBar} from 'react-native'
import {SafeAreaProvider} from 'react-native-safe-area-context'

import Navigators from './Navigators/Navigators'
import ThemeProvider from './themes/ThemeProvider'
import QueryClientProvider from './providers/QueryClientProvider'

const App = () => (
  <SafeAreaProvider>
    <ThemeProvider>
      <QueryClientProvider>
        <StatusBar />
        <Navigators />
      </QueryClientProvider>
    </ThemeProvider>
  </SafeAreaProvider>
)

export default App
