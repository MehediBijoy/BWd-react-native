import {View} from 'react-native'
import {useSafeAreaInsets, Edge} from 'react-native-safe-area-context'

import {capitalize} from 'utils'
import type {Children} from 'types'

const SafeAreaView = ({
  children,
  edges = ['left', 'top', 'right', 'bottom'],
}: Children & {edges: Edge[]}) => {
  const insets = useSafeAreaInsets()

  const mappedInsets = edges.reduce(
    (acc, curr) => ({...acc, [`padding${capitalize(curr)}`]: insets[curr]}),
    {}
  )

  return <View style={[{flex: 1}, mappedInsets]}>{children}</View>
}

export default SafeAreaView
