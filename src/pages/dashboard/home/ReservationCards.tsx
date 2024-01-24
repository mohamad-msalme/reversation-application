import React from 'react'
import { HomePageProps } from './HomePage'
import { ReservationCard } from './reservation-card/ReservationCard'
import { Box, CardContent, Typography } from '@mui/material'
import { useReservationsByType } from 'services/useReservationsByType'

export const ReservationCards: React.FC<HomePageProps> = ({ type, title }) => {
  const { data } = useReservationsByType(type)

  if (data.length === 0) {
    return (
      <Box
        pt={5}
        display="flex"
        alignItems="center"
        justifyContent="center"
        width={'100%'}
      >
        <Typography variant="h5">{`No ${title}`}</Typography>
      </Box>
    )
  }

  return (
    <>
      {data.map(reservation => (
        <ReservationCard
          key={reservation.reservationId}
          reservation={reservation}
        >
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              rowGap: 3
            }}
          >
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
      ))}
    </>
  )
}
