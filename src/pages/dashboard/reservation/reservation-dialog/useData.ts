import { useQuery } from '@tanstack/react-query'
import { useLoaderData } from 'react-router'
import { PropertiesQuery } from 'services/fetchProperties'
import { ReservationByIdQuery } from 'services/reservationByFilter'
import { ReservationLoaderResponse } from './loader'

export const useData = () => {
  const {
    reservation,
    propertyId,
    propertyName,
    initialPublicProperties,
    reservationId
  } = useLoaderData() as ReservationLoaderResponse

  const { data: publicPropties } = useQuery({
    ...PropertiesQuery('public'),
    initialData: initialPublicProperties,
    select: data =>
      data.map(item => ({
        propertyId: item._id,
        name: item.name
      }))
  })

  const { data } = useQuery({
    ...ReservationByIdQuery(reservationId ?? ''),
    enabled: !!reservationId,
    initialData: reservation,
    select: data => ({
      reservationId: data._id ?? reservationId,
      propertyId,
      propertyName,
      publiProperties: data.properties.filter(
        property => property.propertyId !== propertyId
      ),
      name: data.name,
      email: data.email,
      checkin: new Date(data.checkin),
      checkout: new Date(data.checkout),
      updatedAt: data.updatedAt
    })
  })
  return {
    reservation: data ?? reservation,
    publicPropties
  }
}
