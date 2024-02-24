/* eslint-disable no-useless-catch */
import { isAxiosError } from 'axios'
import { axiosInstance } from 'client/axiosInstance'
import { SuccessUserResponse } from 'models/User'

type TVariables = {
  email: string
  password: string
}

export const signupMutation = () => ({
  mutationKey: ['signupMutation'],
  mutationFn: async (variables: TVariables) => signup(variables)
})

export const signup = async ({ email, password }: TVariables) => {
  try {
    const data = await axiosInstance.post<SuccessUserResponse>('/auth/signup', {
      email,
      password
    })
    return data.data.success.user
  } catch (error) {
    let message = 'Somthing went wrong, please try again'
    if (
      isAxiosError<{ errors: [{ message: string }] }>(error) &&
      error.response?.data.errors &&
      error.response?.data.errors.length > 0
    ) {
      message = error.response.data.errors[0].message
    }
    throw Error(message)
  }
}
