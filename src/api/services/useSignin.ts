import { axiosInstance } from 'client/axiosInstance'
import { SuccessUserResponse, User } from 'models/User'
import { UseMutationOptions, useMutation } from 'react-query'

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
    console.log(error)
    throw error
  }
}

export const useSignin = (
  options: UseMutationOptions<User, unknown, TVariables, unknown> = {}
) => useMutation(signin, options)
