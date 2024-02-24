/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { axiosInstance } from 'client/axiosInstance'
import {
  ReservationsType,
  SuccessReserveationArrivalsResponse
} from 'models/Reservation'

export const ReservationsTypeQuery = (type: ReservationsType) => ({
  queryKey: ['ReservationsTypeQuery', type],
  queryFn: async () => getReservationsByType(type)
})

const getReservationsByType = async (type: ReservationsType) => {
  try {
    const data = await axiosInstance.get<SuccessReserveationArrivalsResponse>(
      `/reservations/${type}`
    )
    return data.data.success.reservations
  } catch (error) {
    return []
  }
}
