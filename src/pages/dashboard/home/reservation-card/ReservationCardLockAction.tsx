import React from 'react'
import LockIcon from '@mui/icons-material/Lock'
import { Button, ButtonProps } from '@mui/material'

export const ReservationCardLockAction: React.FC<
  React.PropsWithChildren<ButtonProps>
> = ({ children, ...btnProps }) => {
  const label = children ? children : 'Lock'
  return (
    <Button color="error" startIcon={<LockIcon />} {...btnProps}>
      {label}
    </Button>
  )
}
