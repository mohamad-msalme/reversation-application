import { QueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { ReservationsByTypeQuery } from 'services/reservationByFilter'
import { Reservation, ReservationsType } from 'models/Reservation'

export interface HomeLoaderResponse {
  initialDataReservation: Reservation[]
  success: boolean
}

export const loader = async (
  queryClient: QueryClient,
  type: ReservationsType
): Promise<HomeLoaderResponse> => {
  try {
    const initialDataReservation = await queryClient.ensureQueryData(
      ReservationsByTypeQuery(type)
    )

    return {
      initialDataReservation,
      success: true
    }
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) throw error
    return {
      initialDataReservation: [],
      success: false
    }
  }
}
