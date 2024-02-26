/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { HomePageProps } from './HomePage'
import { ReservationCard } from './reservation-card/ReservationCard'
import { HomeLoaderResponse } from './loader'
import { ReservationsTypeQuery } from 'services/reservationsByType'
import { PropertyOutletContext } from '../property'
import { PropertiesQuery, select } from 'services/fetchProperties'
import { Box, CardContent, Typography } from '@mui/material'
import { useLoaderData, useOutletContext } from 'react-router-dom'

export const ReservationCards: React.FC<HomePageProps> = ({ type, title }) => {
  const { showNotification } = useOutletContext<PropertyOutletContext>()
  const { initialDataProperties, initialDataReservation, success } =
    useLoaderData() as HomeLoaderResponse
  const { data: properties } = useQuery({
    ...PropertiesQuery(),
    initialData: initialDataProperties
  })
  const { data: reservations } = useQuery({
    ...ReservationsTypeQuery(type),
    initialData: initialDataReservation,
    select: reservations => select(properties ?? [], reservations)
  })

  React.useMemo(
    () => !success && showNotification(`Error fetch ${type}`, 'error'),
    [type]
  )

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
