import {makeStyles} from '@rneui/themed'

export const useStyles = makeStyles(({colors}) => ({
  container: {
    display: 'flex',
    rowGap: 5,
  },
  inputWrapper: {
    width: '100%',
    height: 50,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.bgPaper,
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bgPaper,
  },
  input: {
    flex: 1,
  },
  label: {
    fontSize: 15,
    marginStart: 5,
    color: colors.black,
    textTransform: 'capitalize',
  },

  errorText: {
    fontSize: 13,
    marginStart: 5,
    textTransform: 'capitalize',
  },

  focused: {
    color: colors.primary,
    borderColor: colors.primary,
  },

  error: {
    color: colors.error,
    borderColor: colors.error,
  },
}))
