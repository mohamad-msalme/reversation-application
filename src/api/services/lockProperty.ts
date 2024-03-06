/* eslint-disable no-useless-catch */
import { axiosInstance } from 'client/axiosInstance'
import { ReservationsType } from 'models/Reservation'

type TVariables = {
  reservationId: string
  propertyId: string
  status: string
  type: ReservationsType
}
export const PropertyStatusMutation = () => ({
  mutationKey: ['PropertyStatusMutation'],
  mutationFn: async (variables: TVariables) => updatePropertyStatus(variables)
})

const updatePropertyStatus = async (variables: TVariables) => {
  const { reservationId, ...rest } = variables
  try {
    await axiosInstance.patch(`/reservations/status/${reservationId}`, rest)
  } catch (error) {
    throw error
  }
}
