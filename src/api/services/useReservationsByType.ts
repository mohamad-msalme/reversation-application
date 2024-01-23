import { useQuery } from 'react-query'
import { axiosInstance } from 'client/axiosInstance'
import { useGetProperties } from './useGetProperties'
import {
  ReservationsType,
  SuccessReserveationArrivalsResponse
} from 'models/Reservation'

export const getReservationsByType = async ({
  type
}: {
  type: ReservationsType
}) => {
  try {
    const data = await axiosInstance.get<SuccessReserveationArrivalsResponse>(
      `/reservations/${type}`
    )
    return data.data.success.reservations
  } catch (error) {
    //
    return []
  }
}

export const useReservationsByType = (type: ReservationsType) => {
  const {
    data: properties,
    isSuccess,
    isLoading: loadingProperties
  } = useGetProperties()

  const { data: reservations, isLoading: loadingReservations } = useQuery(
    ['useReservationsByType', type],
    getReservationsByType.bind(undefined, { type }),
    {
      enabled: isSuccess,
      select: reservations => {
        return reservations.map(reservation => ({
          ...reservation,
          reservation: properties!.find(
            property => property._id === reservation.propertyId
          )
        }))
      }
    }
  )

  return {
    data: reservations,
    isLoading: loadingProperties || loadingReservations
  }
}
