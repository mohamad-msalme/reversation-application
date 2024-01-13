/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable no-useless-catch */
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { axiosInstance } from 'client/axiosInstance'
import { SuccessUserResponse } from 'models/User'
import { Coockies } from '../../utils/Coockies'

type TVariables = {
  email: string
  password: string
}
export const signin = async ({ email, password }: TVariables) => {
  try {
    const data = await axiosInstance.post<SuccessUserResponse>('/auth/login', {
      email,
      password
    })
    console.log(data.headers, data)
    return data.data.success.user
  } catch (error) {
    throw error
  }
}

export const useSignin = () => {
  const navigation = useNavigate()
  return useMutation(signin, {
    onSuccess: data => {
      Coockies.updateUserInfo(JSON.stringify(data))
      navigation('/home')
    }
  })
}
