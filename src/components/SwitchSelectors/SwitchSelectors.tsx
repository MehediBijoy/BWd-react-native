import React from 'react'
import {View} from 'react-native'
import {Text, makeStyles} from '@rneui/themed'

import Switch from '@core/Switch'

type Data = {
  id: string
  label: string | JSX.Element
}

type SwitchSelectorsProps = {
  data: Data[]
  onChange(id: string): void
  active: string
}

const SwitchSelectors = ({data, onChange, active}: SwitchSelectorsProps) => {
  const styles = useStyles()
  const DataLength = data.length

  return (
    <View>
      {data.map(({id, label}, index) => (
        <View key={id} style={index !== DataLength && styles.switchWrapper}>
          {React.isValidElement(label) ? label : <Text style={styles.label}>{label}</Text>}
          <Switch onChange={() => onChange(id)} active={active === id} />
        </View>
      ))}
    </View>
  )
}

const useStyles = makeStyles(() => ({
  switchWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
  },
}))

export default SwitchSelectors
