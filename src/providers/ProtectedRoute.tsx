import React from 'react'
import { useIsAuth } from 'services/useIsAuth'

interface ProtectedRouteProps {
  authenticatedElement: React.ReactNode
  unauthenticatedElement: React.ReactNode
}

export const ProtectedRoute = ({
  authenticatedElement,
  unauthenticatedElement
}: ProtectedRouteProps) => {
  const isAuthinicated = useIsAuth()
  return isAuthinicated ? authenticatedElement : unauthenticatedElement
}
