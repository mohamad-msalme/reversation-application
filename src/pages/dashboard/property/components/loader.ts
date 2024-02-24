import { QueryClient } from '@tanstack/react-query'
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

      const initialData =
        queryClient.getQueryData(PropertyQuery(params.params.id).queryKey) ??
        (await queryClient.fetchQuery(PropertyQuery(params.params.id)))

      return {
        success: true,
        initialData
      }
    } catch (error) {
      //
      return {
        success: false,
        initialData: undefined
      }
    }
  }
