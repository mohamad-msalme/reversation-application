/* eslint-disable no-useless-catch */
import { Coockies } from '../../utils/Coockies'
import { AxiosResponse } from 'axios'
import { axiosInstance } from 'client/axiosInstance'
import { SuccessUserResponse } from 'models/User'
import { UseQueryOptions, useQuery } from 'react-query'
import { useLocation } from 'react-router-dom'

const getIsAuth = async () => {
  try {
    const data = await axiosInstance.get<SuccessUserResponse>('/auth')
    return data
  } catch (error) {
    throw error
  }
}

export const useIsAuth = (
  options: UseQueryOptions<
    AxiosResponse<SuccessUserResponse, unknown>,
    unknown,
    AxiosResponse<SuccessUserResponse, unknown>,
    string[]
  > = {}
) => {
  const location = useLocation()
  const userInfo = Coockies.getUserInfo()
  const enabled = location.state !== 'fromAuth'
  const { isSuccess } = useQuery(['userAut', userInfo?._id || ''], getIsAuth, {
    enabled,
    ...options,
    suspense: true,
    useErrorBoundary: false,
    onSuccess: data => {
      options?.onSuccess?.(data)
      Coockies.updateUserInfo(JSON.stringify(data))
    }
  })
  // if enable is false that means user coming from log in or sign up page there is no need to check that auth state
  return enabled ? isSuccess : true
}
