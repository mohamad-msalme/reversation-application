/* eslint-disable no-useless-catch */
import { Coockies } from '../../utils/Coockies'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { axiosInstance } from 'client/axiosInstance'

export const logout = async () => {
  try {
    const data = axiosInstance.get('/auth/logout')
    return data
  } catch (error) {
    throw error
  }
}

export const useLogout = () => {
  const navigate = useNavigate()
  const { mutateAsync } = useMutation({
    mutationKey: ['logout'],
    mutationFn: logout,
    onSuccess: () => {
      Coockies.removeUserInfo()
      navigate('/login')
    }
  })
  return mutateAsync
}
