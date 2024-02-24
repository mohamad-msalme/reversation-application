import React from 'react'
import { IsAuthQuery } from 'services/isAuth'
import { useSuspenseQuery } from '@tanstack/react-query'

interface ProtectedRouteProps {
  authenticatedElement: React.ReactNode
  unauthenticatedElement: React.ReactNode
}

export const ProtectedRoute = ({
  authenticatedElement,
  unauthenticatedElement
}: ProtectedRouteProps) => {
  const { isSuccess: isAuthinicated } = useSuspenseQuery({
    ...IsAuthQuery()
  })
  return isAuthinicated ? authenticatedElement : unauthenticatedElement
}
