import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { PropertiesQuery } from 'services/fetchProperties'
import { PropertyOutletContext } from '.'
import { Property, PropertyType } from 'models/Property'
import { useLoaderData, useSearchParams } from 'react-router-dom'

export const usePropertiesData = (
  showNotification: PropertyOutletContext['showNotification']
) => {
  const [searchParams] = useSearchParams()

  const { initialData, success } = useLoaderData() as {
    success: boolean
    initialData: Property[]
  }

  const response = useQuery({
    ...PropertiesQuery(
      (searchParams.get('type') as PropertyType | undefined) ?? 'all'
    ),
    initialData
  })

  React.useEffect(() => {
    if (!success) {
      showNotification(
        'Somthing went wrong by loading Proprties, please reload',
        'error'
      )
    }
  }, [])

  return response
}
