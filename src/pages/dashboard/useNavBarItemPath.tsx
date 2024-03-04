import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { PropertiesQuery } from 'services/fetchProperties'
import { DashboardLoaderResponse } from './loader'
import { useLoaderData, useLocation } from 'react-router-dom'

export const useNavBarItemPath = (path?: string) => {
  const location = useLocation()
  const isSelected = path
    ? location.pathname === path
    : location.pathname.startsWith('/home')

  const { properties } = useLoaderData() as DashboardLoaderResponse
  const { data } = useQuery({
    ...PropertiesQuery('private'),
    initialData: properties
  })

  const _path = React.useMemo(() => {
    const today = new Date()
    const month = today.getMonth()
    const year = today.getFullYear()
    const propertyId = data?.[0]._id ?? ''
    const propertyName = data?.[0].name ?? ''
    if (!path) return '/home/arrivals'
    else if (path.startsWith('/reservations'))
      return `${path}?propertyId=${propertyId}&propertyName=${propertyName}&month=${month}&year=${year}`
    else return path
  }, [data, path])

  return {
    isSelected,
    _path
  }
}
