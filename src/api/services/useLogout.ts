/* eslint-disable no-useless-catch */
import { Coockies } from '../../utils/Coockies'
import { useNavigate } from 'react-router-dom'
import { axiosInstance } from 'client/axiosInstance'
import { AxiosResponse } from 'axios'
import { UseMutationOptions, useMutation } from 'react-query'

export const logout = async () => {
  try {
    const data = axiosInstance.get('/auth/logout')
    return data
  } catch (error) {
    throw error
  }
}

export const useLogout = (
  options: UseMutationOptions<
    AxiosResponse<unknown, unknown>,
    unknown,
    void,
    unknown
  > = {}
) => {
  const navigate = useNavigate()
  const { mutateAsync } = useMutation(logout, {
    ...options,
    onSuccess: async (...params) => {
      await options?.onSuccess?.(...params)
      Coockies.updateUserInfo('undefined')
      navigate('/login')
    }
  })
  return mutateAsync
}
