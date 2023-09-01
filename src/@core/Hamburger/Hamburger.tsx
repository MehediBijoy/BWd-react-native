import React from 'react'
import {makeStyles} from '@rneui/themed'
import {Animated, TouchableOpacity} from 'react-native'

type HamburgerProps = {
  active: boolean
  onPress(): void
}

const Hamburger = ({onPress}: HamburgerProps) => {
  const styles = useStyles()

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Animated.View style={styles.line} />
      <Animated.View style={styles.line} />
      <Animated.View style={styles.line} />
    </TouchableOpacity>
  )
}

const useStyles = makeStyles(({colors}) => ({
  container: {
    height: 25,
    width: 35,
    padding: 5,
    borderRadius: 2,
    justifyContent: 'space-between',
    backgroundColor: colors.bgPaper,
  },
  line: {
    height: 2,
    width: 25,
    borderRadius: 2,
    backgroundColor: colors.textPrimary,
  },
}))

export default Hamburger
