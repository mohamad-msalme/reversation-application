import { Property } from 'models/Property'
import { QueryClient } from '@tanstack/react-query'
import { RouteObject } from 'react-router-dom'
import { Reservation } from 'models/Reservation'
import { isAxiosError } from 'axios'
import { PropertiesQuery } from 'services/fetchProperties'
import { ReservationByIdQuery } from 'services/reservationByFilter'

export interface ReservationLoaderResponse {
  success: boolean
  reservation: Reservation
  propertyId: string
  propertyName: string
  reservationId: string | null
  initialPublicProperties: Property[]
}

export const loader =
  (queryClient: QueryClient): RouteObject['loader'] =>
  async ({ request: { url } }) => {
    const { pathname, searchParams } = new URL(url)
    const propertyId = searchParams.get('propertyId')
    const propertyName = searchParams.get('propertyName')
    const reservationId =
      pathname.split('/').slice(-1)[0] === 'new'
        ? null
        : pathname.split('/').slice(-1)[0]

    const defaultValue = {
      propertyId,
      propertyName,
      reservationId
    }
    try {
      const initialPublicProperties = await queryClient.ensureQueryData(
        PropertiesQuery('public')
      )
      const reservation = !reservationId
        ? defaultValue
        : await queryClient.ensureQueryData({
            ...ReservationByIdQuery(reservationId)
          })

      return {
        success: true,
        reservation,
        propertyId,
        propertyName,
        reservationId,
        initialPublicProperties
      }
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 401) throw error
      return {
        success: false,
        reservation: defaultValue,
        propertyId,
        propertyName,
        reservationId,
        initialPublicProperties: []
      }
    }
  }
