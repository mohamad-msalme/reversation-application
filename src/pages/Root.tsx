import React from 'react'
import { Navigate } from 'react-router-dom'
import { QueryClient } from '@tanstack/react-query'
import { IsAuthQuery } from 'services/isAuth'

export const Root = () => {
  return <Navigate to={'/home/arrivals'} />
}

Root.loader = (queryClient: QueryClient) => async () => {
  await queryClient.fetchQuery(IsAuthQuery())
  return true
}
