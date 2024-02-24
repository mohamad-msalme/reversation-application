/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { Reservation } from 'models/Reservation'
import { HomePageProps } from './HomePage'
import { ReservationCard } from './reservation-card/ReservationCard'
import { PropertyOutletContext } from '../property'
import { Box, CardContent, Typography } from '@mui/material'
import { useLoaderData, useOutletContext } from 'react-router-dom'

export const ReservationCards: React.FC<HomePageProps> = ({ type, title }) => {
  const { showNotification } = useOutletContext<PropertyOutletContext>()
  const { data, success } = useLoaderData() as {
    data: Reservation[]
    success: boolean
  }

  React.useMemo(
    () => !success && showNotification(`Error fetch ${type}`, 'error'),
    [type]
  )

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
