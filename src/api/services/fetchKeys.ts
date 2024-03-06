/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable no-useless-catch */

import { axiosInstance } from 'client/axiosInstance'
import { successfullyKeyResponse } from 'models/Key'

export const KeyShowQuery = (reservationId: string) => ({
  queryKey: ['KeyShowQuery', reservationId],
  queryFn: async () => fetchKeyShow(reservationId)
})

const fetchKeyShow = async (reservationId: string) => {
  if (!reservationId) throw Error('reservationId not provided')
  try {
    const data = await axiosInstance.get<successfullyKeyResponse>(
      `/keys/show/${reservationId}`
    )
    return data.data.success.key
  } catch (error) {
    throw error
  }
}
