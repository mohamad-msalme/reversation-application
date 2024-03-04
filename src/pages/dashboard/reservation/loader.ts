import { Property } from 'models/Property'
import { Reservation } from 'models/Reservation'
import { QueryClient } from '@tanstack/react-query'
import { RouteObject } from 'react-router'
import { isAxiosError } from 'axios'
import { PropertiesQuery } from 'services/fetchProperties'
import { ReservationByDateQuery } from 'services/reservationByFilter'

export interface ReservationLoaderResponse {
  initialDataProperties: Property[]
  success: boolean
  initialDataReservations: Reservation[]
  month: string
  year: string
  propertyId: string | null
  propertyName: string | null
}

export const loader =
  (queryClient: QueryClient): RouteObject['loader'] =>
  async ({ request: { url } }) => {
    const { searchParams } = new URL(url)
    const year = searchParams.get('year')
    const month = searchParams.get('month')
    const propertyId = searchParams.get('propertyId')
    const propertyName = searchParams.get('propertyName')
    try {
      const initialDataProperties = await queryClient.ensureQueryData(
        PropertiesQuery('private')
      )
      let initialDataReservations: Reservation[] = []
      if (month && year && propertyId) {
        initialDataReservations = await queryClient.ensureQueryData(
          ReservationByDateQuery(propertyId, +month, +year)
        )
      }

      return {
        initialDataProperties,
        success: true,
        initialDataReservations,
        year,
        month,
        propertyId,
        propertyName
      }
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 401) throw error
      const today = new Date()
      const month = today.getMonth()
      const year = today.getFullYear()
      return {
        success: false,
        initialDataProperties: [],
        initialDataReservations: [],
        year,
        month,
        propertyId: null,
        propertyName: null
      }
    }
  }
