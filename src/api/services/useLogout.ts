/* eslint-disable no-useless-catch */
import { Coockies } from '../../utils/Coockies'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
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
  const { mutateAsync } = useMutation(logout, {
    onSuccess: () => {
      Coockies.updateUserInfo('undefined')
      navigate('/login')
    },
    onError: () => {
      //
    }
  })
  return mutateAsync
}
