import React from 'react'
import { ReservationKey } from './ReservationKey'
import { Card, CardProps } from '@mui/material'
import { ReservationCardName } from './ReservationCardName'
import { ReservationCardRoom } from './ReservationCardRoom'
import { ReservationCardAction } from './ReservationCardAction'
import { ReservationCardCheckIn } from './ReservationCardCheckIn'
import { ReservationCardCheckOut } from './ReservationCardCheckOut'
import { ReservationCardLockAction } from './ReservationCardLockAction'
import { ReservationCardUnLockAction } from './ReservationCardUnLockAction'
import { Reservation, ReservationsType } from 'models/Reservation'
import { ReservationCardContextProvider } from './ReservationCardContext'

type ReservationCardProps = React.PropsWithChildren<{
  cardProps?: CardProps
  reservation: Reservation | null
  isLoading?: boolean
  type: ReservationsType
}>
export const ReservationCard = ({
  children,
  reservation,
  isLoading,
  type,
  ...cardProps
}: ReservationCardProps) => {
  return (
    <ReservationCardContextProvider
      isLoading={isLoading}
      type={type}
      reservation={reservation}
    >
      <Card
        sx={{
          boxShadow: '0 1px 20px rgba(0, 0, 0, 0.1)',
          borderRadius: '10px'
        }}
        {...cardProps}
      >
        {children}
      </Card>
    </ReservationCardContextProvider>
  )
}

ReservationCard.Name = ReservationCardName
ReservationCard.Room = ReservationCardRoom
ReservationCard.CheckIn = ReservationCardCheckIn
ReservationCard.CheckOut = ReservationCardCheckOut
ReservationCard.Actions = ReservationCardAction
ReservationCard.Lock = ReservationCardLockAction
ReservationCard.Unlock = ReservationCardUnLockAction
ReservationCard.Key = ReservationKey
