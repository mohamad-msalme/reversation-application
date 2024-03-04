/* eslint-disable no-useless-catch */
import { axiosInstance } from 'client/axiosInstance'
import {
  ReservationsType,
  SuccessReserveationResponse,
  SuccessReserveationsResponse
} from 'models/Reservation'

export const ReservationByDateQuery = (
  propertyId: string,
  month: number,
  year: number
) => ({
  queryKey: ['ReservationQueryByFilter', propertyId, month, year],
  queryFn: async () => fetchReservationQueryByDate(propertyId, month, year)
})

export const fetchReservationQueryByDate = async (
  propertyId: string,
  month: number,
  year: number
) => {
  try {
    const data = await axiosInstance<SuccessReserveationsResponse>(
      `reservations/filter?propertyId=${propertyId}&month=${month}&year=${year}`
    )
    return data.data.success.reservations
  } catch (error) {
    throw error
  }
}

export const ReservationsByTypeQuery = (type: ReservationsType) => ({
  queryKey: ['ReservationsByTypeQuery', type],
  queryFn: async () => getReservationsByType(type)
})

const getReservationsByType = async (type: ReservationsType) => {
  try {
    const data = await axiosInstance.get<SuccessReserveationsResponse>(
      `/reservations/${type}`
    )
    return data.data.success.reservations
  } catch (error) {
    throw error
  }
}

export const ReservationByIdQuery = (id: string) => ({
  queryKey: ['ReservationByIdQuery', id],
  queryFn: async () => getReservationById(id)
})

const getReservationById = async (id: string) => {
  const url = `/reservations/${id}`
  try {
    const data = await axiosInstance.get<SuccessReserveationResponse>(url)
    return data.data.success.reservation
  } catch (error) {
    throw error
  }
}

export const ReservationByPropertyIdQuery = (id: string) => ({
  queryKey: ['ReservationByPropertyIdQuery', id],
  queryFn: async () => getReservationByPropertyId(id)
})

const getReservationByPropertyId = async (id: string) => {
  const url = `/reservations/me/${id}`
  try {
    const data = await axiosInstance.get<SuccessReserveationsResponse>(url)
    return data.data.success.reservations
  } catch (error) {
    throw error
  }
}
