import React from 'react'

import LockOpenIcon from '@mui/icons-material/LockOpen'
import { Button, ButtonProps } from '@mui/material'

export const ReservationCardUnLockAction: React.FC<
  React.PropsWithChildren<ButtonProps>
> = ({ children, ...btnProps }) => {
  const label = children ? children : 'Unlock'
  return (
    <Button startIcon={<LockOpenIcon />} color="success" {...btnProps}>
      {label}
    </Button>
  )
}
