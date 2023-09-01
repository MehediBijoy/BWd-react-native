import {makeStyles} from '@rneui/themed'

export const useStyles = makeStyles(({colors}) => ({
  container: {
    display: 'flex',
    borderColor: colors.greyOutline,
  },
  listContainer: {
    padding: 0,
    paddingVertical: 16,
  },
  title: {
    fontSize: 16,
  },
  expanded: {
    color: colors.tertiary,
  },
  description: {
    fontSize: 14,
  },
}))
