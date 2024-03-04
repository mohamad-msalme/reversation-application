/* eslint-disable no-useless-catch */
import { QueryClient } from '@tanstack/react-query'
import { RouteObject } from 'react-router-dom'
import { isAxiosError } from 'axios'
import { PropertyType } from 'models/Property'
import { PropertiesQuery } from 'services/fetchProperties'

export const loader =
  (queryClient: QueryClient): RouteObject['loader'] =>
  async ({ request: { url } }) => {
    const { searchParams } = new URL(url)
    const type = (searchParams.get('type') ?? 'all') as PropertyType
    try {
      const initialData = await queryClient.ensureQueryData(
        PropertiesQuery(type)
      )

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
