import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { ReservationsType } from 'models/Reservation'
import { HomeLoaderResponse } from './loader'
import { PropertyOutletContext } from 'pages/dashboard/properties'
import { ReservationsByTypeQuery } from 'services/reservationByFilter'
import { useLoaderData, useOutletContext } from 'react-router-dom'

export const useHomeData = (type: ReservationsType) => {
  const { showNotification } = useOutletContext<PropertyOutletContext>()

  const { initialDataReservation, success } =
    useLoaderData() as HomeLoaderResponse

  const { data: reservations } = useQuery({
    ...ReservationsByTypeQuery(type),
    initialData: initialDataReservation
  })

  React.useMemo(
    () => !success && showNotification(`Error fetch ${type}`, 'error'),
    [type]
  )

  return reservations
}
