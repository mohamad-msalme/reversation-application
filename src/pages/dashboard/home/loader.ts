/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { Property } from 'models/Property'
import { QueryClient } from '@tanstack/react-query'
import { PropertiesQuery } from 'services/fetchProperties'
import { ReservationsTypeQuery } from 'services/reservationsByType'
import { Reservation, ReservationsType } from 'models/Reservation'

export const loader = async (
  queryClient: QueryClient,
  type: ReservationsType
) => {
  try {
    const properties = await queryClient.fetchQuery(PropertiesQuery())

    const reservationByType = await queryClient.fetchQuery(
      ReservationsTypeQuery(type)
    )

    const select = (properties: Property[], reservations: Reservation[]) =>
      reservations.map(reservation => ({
        ...reservation,
        property: (properties || [])!.find(
          property => property._id === reservation.propertyId
        )
      }))

    return {
      data: select(properties ?? [], reservationByType ?? []),
      success: true
    }
  } catch (error) {
    return {
      data: [],
      success: false
    }
  }
}
