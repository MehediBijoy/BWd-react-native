import {Badge, BadgeProps, useTheme} from '@rneui/themed'

type BadgeComponentProps = {
  badgeStatus: string
} & BadgeProps

const StatusBadge = ({badgeStatus, badgeStyle, ...rest}: BadgeComponentProps) => {
  const {theme} = useTheme()
  let status: keyof typeof theme.colors = 'primary'

  switch (badgeStatus) {
    case 'init':
    case 'accepted':
      status = 'greyOutline'
      break
    case 'confirmed':
    case 'completed':
      status = 'success'
      break
    case 'rejected':
      status = 'error'
      break
    case 'pending':
      status = 'warning'
      break
    default:
      break
  }

  return <Badge {...rest} badgeStyle={[badgeStyle, {backgroundColor: theme.colors?.[status]}]} />
}

export default StatusBadge
