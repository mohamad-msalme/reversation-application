import { axiosInstance } from 'client/axiosInstance'
import { Property } from 'models/Property'
import {
  Reservation,
  SuccessReserveationArrivalsResponse
} from 'models/Reservation'
import { UseQueryOptions, useQuery, useQueryClient } from 'react-query'

export const getArrivals = async () => {
  try {
    const data = await axiosInstance.get<SuccessReserveationArrivalsResponse>(
      '/reservations/arrivals'
    )
    return data.data.success.reservations
  } catch (error) {
    //
    return []
  }
}

export const useArrivals = (
  options?: UseQueryOptions<
    Reservation[],
    unknown,
    Reservation[],
    'useArrivals'
  >
) => {
  const queryClient = useQueryClient()
  const properties = queryClient.getQueryData<Property[]>('useGetProperties')
  useQuery('useArrivals', getArrivals, {
    ...options,
    select: reservations => {
      return reservations.map(reservation => ({
        ...reservation,
        reservationId: JSON.stringify(
          properties!.find(
            property => property._id === reservation.reservationId
          )
        )
      }))
    }
  })
}
