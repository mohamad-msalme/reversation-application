import { axiosInstance } from 'client/axiosInstance'
import { UseQueryOptions, useQuery } from 'react-query'
import { Property, SuccessPropertiesResponse } from 'models/Property'

export const fetchProperties = async () => {
  try {
    const data =
      await axiosInstance.get<SuccessPropertiesResponse>(`/properties`)
    return data.data.success.properties
  } catch (error) {
    //
  }
}

export const useGetProperties = (
  option?: UseQueryOptions<
    Property[] | undefined,
    unknown,
    Property[] | undefined,
    string[]
  >
) => {
  return useQuery(['useGetProperties'], fetchProperties, {
    ...option
  })
}
