/* eslint-disable no-useless-catch */
import { QueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { PropertiesQuery } from 'services/fetchProperties'

export const loader = async (queryClient: QueryClient) => {
  try {
    const initialData = await queryClient.ensureQueryData(PropertiesQuery())

    return {
      success: true,
      initialData
    }
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) throw error
    return {
      success: false,
      initialData: []
    }
  }
}
