import { Property } from 'models/Property'
import { Reservation } from 'models/Reservation'
import { useLoaderData } from 'react-router-dom'
import { PropertiesQuery } from 'services/fetchProperties'
import { ReservationByDateQuery } from 'services/reservationByFilter'
import { ReservationLoaderResponse } from './loader'
import { DefinedInitialDataOptions, useQuery } from '@tanstack/react-query'

export const useReservationsData = <T = Reservation[]>(
  options?: Partial<
    DefinedInitialDataOptions<Reservation[], Error, T, (string | number)[]>
  >,
  optionsProperties?: Partial<
    DefinedInitialDataOptions<Property[], Error, Property[], string[]>
  >
) => {
  const {
    year,
    month,
    propertyId,
    initialDataProperties,
    initialDataReservations,
    propertyName
  } = useLoaderData() as ReservationLoaderResponse

  const { data: properties } = useQuery({
    ...PropertiesQuery('private'),
    initialData: initialDataProperties,
    ...optionsProperties
  })

  const { data: reservations } = useQuery({
    ...ReservationByDateQuery(propertyId ?? '', Number(month), Number(year)),
    initialData: initialDataReservations,
    enabled: !!propertyId,
    ...options
  })

  return {
    propertyId,
    properties,
    reservations,
    propertyName
  }
}
