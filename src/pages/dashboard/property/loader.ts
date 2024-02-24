import { QueryClient } from '@tanstack/react-query'
import { PropertiesQuery } from 'services/fetchProperties'

export const loader = async (queryClient: QueryClient) => {
  try {
    const initialData =
      queryClient.getQueryData(PropertiesQuery().queryKey) ??
      (await queryClient.fetchQuery(PropertiesQuery()))

    return {
      success: true,
      initialData
    }
  } catch (error) {
    return {
      success: false,
      initialData: []
    }
  }
}
