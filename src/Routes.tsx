import React from 'react'

import { SignIn } from 'pages/auth/pages/sign-in'
import { SignUp } from 'pages/auth/pages/sign-up'
import { ErrorPage } from 'pages/ErrorPage'
import { AuthLayout } from 'pages/auth'
import { ForgetPassword } from 'pages/auth/pages/forget-password'
import { ProtectedRoute } from 'providers/ProtectedRoute'
import { DashboardLayout } from 'pages/dashboard/Layout'
import { Navigate, createBrowserRouter } from 'react-router-dom'

import HomeIcon from '@mui/icons-material/Home'
import EditCalendarIcon from '@mui/icons-material/EditCalendar'

export type TPROTECTED_PAGES = {
  path: string
  label: string
  icon: React.ReactNode
  element?: React.ReactNode
}

export const PROTECTED_PAGES: TPROTECTED_PAGES[] = [
  {
    path: '/home',
    label: 'Home',
    icon: <HomeIcon />,
    element: <div>one</div>
  },
  {
    path: '/booking',
    label: 'Booking ',
    icon: <EditCalendarIcon />,
    element: <div>Two</div>
  }
]

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute
        authenticatedElement={<Navigate to={'/home'} />}
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
    children: PROTECTED_PAGES.map(({ path, element }) => ({
      path,
      element: element
    }))
  }
])
