import {Badge, BadgeProps, useTheme, Colors} from '@rneui/themed'

import {Status} from 'api/Response'

type BadgeStatus = Status | 'confirmed' | 'completed'

type StatusBadgeProps = {
  badgeStatus: BadgeStatus
} & BadgeProps

const getStyles = ({colors, status}: {colors: Colors; status: BadgeStatus}) =>
  ({
    default: {
      color: colors.textPrimary,
      backgroundColor: colors.bgPaper,
    },
    init: {
      color: colors.textPrimary,
      backgroundColor: colors.greyOutline,
    },
    accepted: {
      color: colors.textPrimary,
      backgroundColor: colors.greyOutline,
    },
    rejected: {
      color: colors.textPrimary,
      backgroundColor: colors.error,
    },
    pending: {
      color: colors.textPrimary,
      backgroundColor: colors.warning,
    },
    confirmed: {
      color: colors.textPrimary,
      backgroundColor: colors.success,
    },
    completed: {
      color: colors.textPrimary,
      backgroundColor: colors.success,
    },
  }[status] ?? {
    color: colors.textPrimary,
    backgroundColor: colors.grey1,
  })

const StatusBadge = ({badgeStatus, badgeStyle, ...rest}: StatusBadgeProps) => {
  const {theme} = useTheme()
  console.log(badgeStatus)
  const styles = getStyles({colors: theme.colors, status: badgeStatus})

  return <Badge {...rest} badgeStyle={[badgeStyle, styles]} />
}

export default StatusBadge
