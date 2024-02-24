import React from 'react'

import { AuthLayout } from 'pages/auth'
import { ProtectedRoute } from 'providers/ProtectedRoute'
import { PROTECTED_PAGES } from './ProtectedPages'
import { DashboardLayout } from 'pages/dashboard/Layout'
import { Navigate, createBrowserRouter } from 'react-router-dom'

import SignIn from 'pages/auth/pages/sign-in'
import SignUp from 'pages/auth/pages/sign-up'
import ErrorPage from 'pages/ErrorPage'
import ForgetPassword from 'pages/auth/pages/forget-password'

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute
        authenticatedElement={<Navigate to={'/home/arrivals'} />}
        unauthenticatedElement={<Navigate to={'/login'} />}
      />
    ),
    errorElement: <ErrorPage />
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <SignIn />
      },
      {
        path: 'signup',
        element: <SignUp />
      },
      {
        path: 'forgetpassword',
        element: <ForgetPassword />
      }
    ]
  },
  {
    element: (
      <ProtectedRoute
        authenticatedElement={<DashboardLayout />}
        unauthenticatedElement={<Navigate to={'/login'} />}
      />
    ),
    children: PROTECTED_PAGES.map(({ path, loader, element, children }) => ({
      path,
      loader,
      element: element,
      children: children
    }))
  }
])
