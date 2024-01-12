/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable no-useless-catch */
import { Coockies } from '../../utils/Coockies'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { axiosInstance } from 'client/axiosInstance'
import { SuccessUserResponse } from 'models/User'

type TVariables = {
  email: string
  password: string
}
export const signup = async ({ email, password }: TVariables) => {
  try {
    const data = await axiosInstance.post<SuccessUserResponse>('/auth/signup', {
      email,
      password
    })
    return data.data.success.user
  } catch (error) {
    throw error
  }
}

export const useSignup = () => {
  const navigation = useNavigate()
  const { mutateAsync } = useMutation(signup, {
    onSuccess: data => {
      Coockies.updateUserInfo(JSON.stringify(data))
      navigation('/home')
    }
  })

  const mutaion = async (variables: TVariables) => {
    try {
      const data = await mutateAsync(variables)
      return data
    } catch (error) {
      console.log(error)
    }
  }

  return mutaion
}
