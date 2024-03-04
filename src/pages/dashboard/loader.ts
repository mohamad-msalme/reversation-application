import { Property } from 'models/Property'
import { QueryClient } from '@tanstack/react-query'
import { RouteObject } from 'react-router'
import { IsAuthQuery } from 'services/isAuth'
import { PropertiesQuery } from 'services/fetchProperties'

export interface DashboardLoaderResponse {
  properties: Property[]
}

export const loader =
  (queryClient: QueryClient): RouteObject['loader'] =>
  async () => {
    await queryClient.ensureQueryData(IsAuthQuery())
    const properties = await queryClient.ensureQueryData(
      PropertiesQuery('private')
    )
    return properties
  }
