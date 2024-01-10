/* eslint-disable no-useless-catch */
import { Coockies } from '../../utils/Coockies'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router'
import { axiosInstance } from 'client/axiosInstance'
import { SuccessUserResponse } from 'models/User'

const getIsAuth = async () => {
  try {
    const data = await axiosInstance.get<SuccessUserResponse>('/auth')
    return data
  } catch (error) {
    throw error
  }
}

export const useIsAuth = () => {
  const navigate = useNavigate()
  const { data } = useQuery('useAuth', getIsAuth, {
    onSuccess: data => {
      Coockies.updateUserInfo(JSON.stringify(data))
      navigate('/home')
    },
    onError: () => {
      navigate('/login')
    }
  })
  return data
}
