import {makeStyles} from '@rneui/themed'

export const useStyles = makeStyles(({colors}) => ({
  headerTextStyles: {
    color: colors.white,
    textAlign: 'center',
  },
  inputLabelProps: {
    color: colors.white,
  },
  forgotPasswordStyles: {
    paddingTop: 10,
    fontSize: 16,
    color: colors.white,
  },
  error: {
    color: colors.error,
  },
}))
