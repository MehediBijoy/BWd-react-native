import {makeStyles, Colors} from '@rneui/themed'

type StyledTypes = {
  color?: keyof Omit<Colors, 'platform'>
}

export const useStyles = makeStyles(({colors}, {color: defaultColor}: StyledTypes) => ({
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
    borderColor: defaultColor ? colors[defaultColor] : colors.bgPaper,
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bgPaper,
  },

  input: {
    flex: 1,
    height: 50,
    color: colors.textPrimary,
  },

  label: {
    fontSize: 15,
    marginStart: 5,
    color: defaultColor ? colors[defaultColor] : colors.textPrimary,
  },

  helperText: {
    fontSize: 13,
    marginStart: 5,
    color: defaultColor ? colors[defaultColor] : colors.textPrimary,
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
