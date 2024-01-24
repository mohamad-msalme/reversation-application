import React from 'react'

import { Button, ButtonProps } from '@mui/material'
import { useReservationCard } from './ReservationCardContext'
import LockOpenIcon from '@mui/icons-material/LockOpen'

export const ReservationCardUnLockAction: React.FC<
  React.PropsWithChildren<ButtonProps>
> = ({ children, ...btnProps }) => {
  const label = children ? children : 'Unlock'
  const value = useReservationCard()
  console.log(value)
  return (
    <Button startIcon={<LockOpenIcon />} color="success" {...btnProps}>
      {label}
    </Button>
  )
}
