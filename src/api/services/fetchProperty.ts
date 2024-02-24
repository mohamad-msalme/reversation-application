import { axiosInstance } from 'client/axiosInstance'
import { SuccessPropertyResponse } from 'models/Property'

export const PropertyQuery = (id: string) => ({
  queryKey: ['PropertyQuery', id],
  queryFn: async () => fetchProperty(id)
})

export const fetchProperty = async (id: string) => {
  try {
    const data = await axiosInstance.get<SuccessPropertyResponse>(
      `/properties/${id}`
    )
    console.log(data)
    return data.data.success.property
  } catch (error) {
    //
    return undefined
  }
}
