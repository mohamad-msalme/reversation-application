/* eslint-disable no-useless-catch */
import { Coockies } from '../../utils/Coockies'
import { useNavigate } from 'react-router-dom'
import { axiosInstance } from 'client/axiosInstance'
import { AxiosResponse } from 'axios'
import { UseMutationOptions, useMutation, useQueryClient } from 'react-query'

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
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { mutateAsync } = useMutation(logout, {
    ...options,
    onSuccess: async (...params) => {
      await queryClient.invalidateQueries()
      await options?.onSuccess?.(...params)
      Coockies.removeUserInfo()
      navigate('/login')
    }
  })
  return mutateAsync
}
