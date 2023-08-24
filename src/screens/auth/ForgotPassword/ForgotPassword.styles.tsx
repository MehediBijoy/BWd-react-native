import {makeStyles} from '@rneui/themed'

export const useStyles = makeStyles(theme => ({
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
    color: theme.colors.white,
    textAlign: 'center',
  },
  infoStyles: {
    color: theme.colors.white,
  },
  inputLabelProps: {
    color: theme.colors.white,
  },
}))
