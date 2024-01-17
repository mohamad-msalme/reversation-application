import { axiosInstance } from 'client/axiosInstance'
import { UseQueryOptions, useQuery } from 'react-query'
import { Property, SuccessPropertyResponse } from 'models/Property'

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

export const useGetProperty = (
  id: string,
  options?: UseQueryOptions<
    Property | undefined,
    unknown,
    Property | undefined,
    string[]
  >
) =>
  useQuery(['useGetProperty', id], fetchProperty.bind(undefined, id), options)
