import React from 'react'
import {Switch as BaseSwitch} from '@rneui/themed'

const Switch = () => {
  const [checked, setChecked] = React.useState(false)
  return (
    <BaseSwitch
      value={checked}
      onChange={() => setChecked(pre => !pre)}
      style={{backgroundColor: 'green', padding: 10, borderRadius: 10}}
    />
  )
}

export default Switch
