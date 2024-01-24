import React from 'react'
import LockIcon from '@mui/icons-material/Lock'
import { useReservationCard } from './ReservationCardContext'
import { Button, ButtonProps } from '@mui/material'

export const ReservationCardLockAction: React.FC<
  React.PropsWithChildren<ButtonProps>
> = ({ children, ...btnProps }) => {
  const label = children ? children : 'Lock'
  const value = useReservationCard()
  console.log(value)
  return (
    <Button color="error" startIcon={<LockIcon />} {...btnProps}>
      {label}
    </Button>
  )
}
