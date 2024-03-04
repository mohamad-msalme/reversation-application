import { useQuery } from '@tanstack/react-query'
import { PropertyQuery } from 'services/fetchProperty'
import { PropertyLoaderResponse } from '../property-edit-dialog/loader'
import { useLoaderData, useParams } from 'react-router-dom'

export const useDate = () => {
  const { id } = useParams()
  const { initialData } = useLoaderData() as PropertyLoaderResponse
  const { data } = useQuery({
    ...PropertyQuery(id),
    enabled: !!id,
    initialData
  })

  return data
}
