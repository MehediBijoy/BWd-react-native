import {Badge, BadgeProps, useTheme, Colors} from '@rneui/themed'

import {Status, UserStatus} from 'api/Response'

type BadgeStatus = Status | 'confirmed' | 'completed'

type StatusBadgeProps = {
  status: BadgeStatus | UserStatus
  label?: string
} & Omit<BadgeProps, 'status' | 'value'>

type StatusMapper = 'default' | 'success' | 'error' | 'warning' | 'active'

const getStyles = ({colors, status}: {colors: Colors; status?: StatusMapper}) =>
  ({
    default: {
      color: colors.textPrimary,
      backgroundColor: colors.greyOutline,
    },
    error: {
      color: colors.textPrimary,
      backgroundColor: colors.error,
    },
    warning: {
      color: colors.textPrimary,
      backgroundColor: colors.warning,
    },
    success: {
      color: colors.textPrimary,
      backgroundColor: colors.tertiary,
    },
    active: {
      color: colors.textPrimary,
      backgroundColor: colors.primary,
    },
  }[status ?? 'default'])

const StatusBadge = ({status, label, badgeStyle, ...rest}: StatusBadgeProps) => {
  const {theme} = useTheme()

  // active inactive investigate blocked banned deleted
  const statuses: {[key: string]: StatusMapper} = {
    accepted: 'default',
    pending: 'warning',
    rejected: 'error',
    confirmed: 'success',
    completed: 'success',
    active: 'active',
    inactive: 'error',
    investigate: 'warning',
    blocked: 'error',
    banned: 'error',
    deleted: 'error',
  }

  const statusStyles = getStyles({colors: theme.colors, status: statuses[status]})

  return (
    <Badge
      badgeStyle={[{height: 25, paddingHorizontal: 5, borderRadius: 50}, badgeStyle, statusStyles]}
      value={label ?? status}
      textStyle={{textTransform: 'capitalize'}}
      {...rest}
    />
  )
}

export default StatusBadge
