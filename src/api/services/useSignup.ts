/* eslint-disable no-useless-catch */
import { axiosInstance } from 'client/axiosInstance'
import { SuccessUserResponse, User } from 'models/User'
import { UseMutationOptions, useMutation } from 'react-query'

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

export const useSignup = (
  options: UseMutationOptions<User, unknown, TVariables, unknown> = {}
) => useMutation(signup, options)
