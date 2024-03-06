/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useHomeData } from './useHomeData'
import { HomePageProps } from './HomePage'
import { ReservationCard } from './reservation-card/ReservationCard'
import { Box, CardContent, Typography } from '@mui/material'

export const ReservationCards: React.FC<HomePageProps> = ({ type, title }) => {
  const reservations = useHomeData(type)

  if (reservations.length === 0) {
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
      {reservations.map(reservation => (
        <ReservationCard
          type={type}
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
            <ReservationCard.Key />
          </CardContent>
        </ReservationCard>
      ))}
    </>
  )
}
