import {
  makeStyles,
  CheckBox as BaseCheckBox,
  CheckBoxProps as BaseCheckBoxProps,
  Colors,
} from '@rneui/themed'

type CheckBoxProps = {
  checked: boolean
  title: string | JSX.Element
  error?: boolean
  color?: keyof Omit<Colors, 'platform'>
} & Omit<BaseCheckBoxProps, 'children'>

type StyledTypes = {
  color?: keyof Omit<Colors, 'platform'>
}

const CheckBox = ({checked, title, color, error, ...rest}: CheckBoxProps) => {
  const styles = useStyles({color})

  return (
    <BaseCheckBox
      title={title}
      checked={checked}
      textStyle={styles.title}
      iconType='material-community'
      checkedIcon='checkbox-marked'
      uncheckedIcon='checkbox-blank-outline'
      containerStyle={styles.container}
      uncheckedColor={!error ? styles.title.color : styles.error.color}
      checkedColor={styles.checked.color}
      {...rest}
    />
  )
}

const useStyles = makeStyles(({colors}, {color: defaultColor}: StyledTypes) => ({
  container: {
    width: '100%',
    backgroundColor: 'transparent',
    padding: 0,
    margin: 0,
    marginLeft: 0,
    marginRight: 0,
  },
  title: {
    color: defaultColor ? colors[defaultColor] : colors.textPrimary,
  },
  checked: {
    color: colors.primary,
  },
  error: {
    color: colors.error,
  },
}))

export type {CheckBoxProps}
export default CheckBox
