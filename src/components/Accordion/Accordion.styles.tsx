import {makeStyles} from '@rneui/themed'

export const useStyles = makeStyles(({colors}) => ({
  container: {
    display: 'flex',
    borderColor: colors.greyOutline,
  },
  title: {
    fontSize: 18,
  },
  subTitle: {
    fontSize: 16,
  },
}))
