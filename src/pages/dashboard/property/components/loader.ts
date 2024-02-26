/* eslint-disable no-useless-catch */
import { QueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { RouteObject } from 'react-router'
import { PropertyQuery } from 'services/fetchProperty'

export const loader: (queryClient: QueryClient) => RouteObject['loader'] =
  queryClient => async params => {
    try {
      if (!params.params.id)
        return {
          success: true,
          initialData: undefined
        }

      const initialData = await queryClient.ensureQueryData(
        PropertyQuery(params.params.id)
      )

      return {
        success: true,
        initialData
      }
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 401) throw error
      return {
        success: false,
        initialData: undefined
      }
    }
  }
