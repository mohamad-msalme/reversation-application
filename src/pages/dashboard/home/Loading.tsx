import React from 'react'
import { CardContent } from '@mui/material'
import { ReservationCard } from './reservation-card/ReservationCard'

export const Loading: React.FC = () =>
  [1, 2, 3].map(reservation => (
    <ReservationCard isLoading key={reservation} reservation={null}>
      <CardContent>
        <ReservationCard.Name />
        <ReservationCard.CheckIn />
        <ReservationCard.CheckOut />
        <ReservationCard.Room />
      </CardContent>
      <ReservationCard.Actions actionArea>
        <ReservationCard.Lock />
        <ReservationCard.Unlock />
      </ReservationCard.Actions>
    </ReservationCard>
  ))
