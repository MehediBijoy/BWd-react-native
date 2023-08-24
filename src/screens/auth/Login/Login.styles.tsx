import {makeStyles} from '@rneui/themed'

export const useStyles = makeStyles(({colors}) => ({
  container: {
    marginTop: 50,
    width: '100%',
    maxWidth: 400,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  innerContainer: {
    display: 'flex',
    rowGap: 10,
  },
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
}))
