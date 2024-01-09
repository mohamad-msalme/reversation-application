import React from 'react'
import { useAuth } from 'hooks/useAuth'

interface ProtectedRouteProps {
  authenticatedElement: React.ReactNode
  unauthenticatedElement: React.ReactNode
}

export const ProtectedRoute = ({
  authenticatedElement,
  unauthenticatedElement
}: ProtectedRouteProps) => {
  const { isAuthnicated } = useAuth()

  return isAuthnicated ? authenticatedElement : unauthenticatedElement
}
