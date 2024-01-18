/* eslint-disable no-useless-catch */
import { Coockies } from '../../utils/Coockies'
import { axiosInstance } from 'client/axiosInstance'
import { SuccessUserResponse, User } from 'models/User'
import { UseQueryOptions, useQuery } from 'react-query'

const getIsAuth = async () => {
  try {
    const data = await axiosInstance.get<SuccessUserResponse>('/auth')
    return data.data.success.user
  } catch (error) {
    throw error
  }
}

export const useIsAuth = (
  options: UseQueryOptions<Promise<User>, unknown, Promise<User>, string[]> = {}
) => {
  const { isSuccess } = useQuery(['userAut'], getIsAuth, {
    ...options,
    enabled: true,
    suspense: true,
    useErrorBoundary: false,
    cacheTime: 0,
    staleTime: 0,
    onSuccess: data => {
      options?.onSuccess?.(data)
      Coockies.updateUserInfo(JSON.stringify(data))
    }
  })
  return isSuccess
}
