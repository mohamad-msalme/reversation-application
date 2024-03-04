/* eslint-disable no-useless-catch */
import { axiosInstance } from 'client/axiosInstance'
import { SuccessPropertyResponse } from 'models/Property'

export const PropertyQuery = (id?: string) => ({
  queryKey: ['PropertyQuery', id],
  queryFn: async () => fetchProperty(id)
})

export const fetchProperty = async (id?: string) => {
  if (!id) throw Error('id is not provided')
  try {
    const data = await axiosInstance.get<SuccessPropertyResponse>(
      `/properties/${id}`
    )
    return data.data.success.property
  } catch (error) {
    throw error
  }
}
