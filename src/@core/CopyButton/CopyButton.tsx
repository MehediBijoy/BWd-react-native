import React, {useState} from 'react'
import Clipboard from '@react-native-clipboard/clipboard'
import {Tooltip, Icon, Text, makeStyles} from '@rneui/themed'
import {View, TouchableOpacity} from 'react-native'

type CopyButtonProps = {
  toCopy: string
  buttonText?: JSX.Element
}

const CopyButton = ({toCopy, buttonText}: CopyButtonProps) => {
  const [tooltipVisible, setTooltipVisible] = useState(false)

  const styles = useStyles()

  const handleCopy = () => {
    Clipboard.setString(toCopy)
    setTooltipVisible(true)

    // Hide the tooltip after a few seconds (adjust the delay as needed)
    setTimeout(() => {
      setTooltipVisible(false)
    }, 2000)
  }

  return (
    <View>
      <TouchableOpacity
        activeOpacity={buttonText ? 1 : 0.5}
        onPress={handleCopy}
        style={buttonText ? styles.buttonText : styles.button}
      >
        {buttonText ? buttonText : <Icon type='material-community' name='content-copy' />}
      </TouchableOpacity>
      <Tooltip
        width={80}
        visible={tooltipVisible}
        popover={<Text style={[styles.tooltipText]}>Copied</Text>}
        onClose={() => setTooltipVisible(false)}
      />
    </View>
  )
}

const useStyles = makeStyles(({colors}) => ({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'flex-start',
  },
  tooltipText: {
    color: colors.textReverse,
  },
}))

export default CopyButton
