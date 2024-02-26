/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { Property } from 'models/Property'
import { QueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { PropertiesQuery } from 'services/fetchProperties'
import { ReservationsTypeQuery } from 'services/reservationsByType'
import { Reservation, ReservationsType } from 'models/Reservation'

export interface HomeLoaderResponse {
  initialDataProperties: Property[]
  initialDataReservation: Reservation[]
  success: boolean
}

export const loader = async (
  queryClient: QueryClient,
  type: ReservationsType
): Promise<HomeLoaderResponse> => {
  try {
    const initialDataProperties = await queryClient.ensureQueryData({
      ...PropertiesQuery()
    })

    const initialDataReservation = await queryClient.ensureQueryData(
      ReservationsTypeQuery(type)
    )

    return {
      initialDataProperties,
      initialDataReservation,
      success: true
    }
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) throw error
    return {
      initialDataProperties: [],
      initialDataReservation: [],
      success: false
    }
  }
}
