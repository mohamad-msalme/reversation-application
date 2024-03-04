/* eslint-disable no-useless-catch */
import { axiosInstance } from 'client/axiosInstance'
import { PropertyType, SuccessPropertiesResponse } from 'models/Property'

export const PropertiesQuery = (type: PropertyType) => ({
  queryKey: ['PropertiesQuery', type],
  queryFn: async () => fetchProperties(type)
})

const fetchProperties = async (type: PropertyType) => {
  const _type = type === 'all' ? undefined : type
  try {
    const data = await axiosInstance.get<SuccessPropertiesResponse>(
      `/properties${_type ? '?type=' + type : ''}`
    )
    return data.data.success.properties
  } catch (error) {
    throw error
  }
}
