/* eslint-disable no-useless-catch */
import { Coockies } from 'utils/Coockies'
import { axiosInstance } from 'client/axiosInstance'
import { SuccessUserResponse } from 'models/User'

export const IsAuthQuery = () => ({
  queryKey: ['IsAuthQuery'],
  queryFn: async () => getIsAuth()
})

const getIsAuth = async () => {
  try {
    const data = await axiosInstance.get<SuccessUserResponse>('/auth')
    Coockies.updateUserInfo(JSON.stringify(data))
    return data.data.success.user
  } catch (error) {
    throw error
  }
}
