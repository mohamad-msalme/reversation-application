/* eslint-disable no-useless-catch */
import { Coockies } from '../../utils/Coockies'
import { AxiosResponse } from 'axios'
import { axiosInstance } from 'client/axiosInstance'
import { SuccessUserResponse } from 'models/User'
import { UseQueryOptions, useQuery } from 'react-query'

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
  const userInfo = Coockies.getUserInfo()
  const { isSuccess } = useQuery(['userAut', userInfo?._id || ''], getIsAuth, {
    ...options,
    suspense: true,
    useErrorBoundary: false,
    onSuccess: data => {
      options?.onSuccess?.(data)
      Coockies.updateUserInfo(JSON.stringify(data))
    }
  })

  return isSuccess
}
