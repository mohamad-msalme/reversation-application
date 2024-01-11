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
  const isAuthnicated = useIsAuth()

  return isAuthnicated ? authenticatedElement : unauthenticatedElement
}
