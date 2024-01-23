import React from 'react'
import { ReservationsType } from 'models/Reservation'
import { useReservationsByType } from 'services/useReservationsByType'

type HomeCards = {
  title: string
  type: ReservationsType
}
export const HomeCards: React.FC<HomeCards> = ({ title, type }) => {
  const { data } = useReservationsByType(type)
  console.log(data)
  return (
    <div>
      {title}
      {type}
    </div>
  )
}
