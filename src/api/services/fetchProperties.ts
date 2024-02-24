import { axiosInstance } from 'client/axiosInstance'
import { SuccessPropertiesResponse } from 'models/Property'

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
    //
    console.log(error)
  }
}
