/* eslint-disable no-useless-catch */
import { axiosInstance } from 'client/axiosInstance'
import { Property, SuccessPropertiesResponse } from 'models/Property'
import { Reservation } from 'models/Reservation'

export const PropertiesQuery = () => ({
  queryKey: ['PropertiesQuery'],
  queryFn: async () => fetchProperties()
})

const fetchProperties = async () => {
  try {
    const data =
      await axiosInstance.get<SuccessPropertiesResponse>(`/properties`)
    return data.data.success.properties
  } catch (error) {
    throw error
  }
}

export const select = (properties: Property[], reservations: Reservation[]) =>
  reservations.map(reservation => ({
    ...reservation,
    property: properties.find(
      property => property._id === reservation.propertyId
    )
  }))
