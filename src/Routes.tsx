import React from 'react'

import { Root } from 'pages/Root'
import { AuthLayout } from 'pages/auth'
import { QueryClient } from '@tanstack/react-query'
import { PROTECTED_PAGES } from './ProtectedPages'
import { DashboardLayout } from 'pages/dashboard/Layout'
import { createBrowserRouter } from 'react-router-dom'

import SignIn from 'pages/auth/pages/sign-in'
import SignUp from 'pages/auth/pages/sign-up'
import ForgetPassword from 'pages/auth/pages/forget-password'
import ErrorPage from 'pages/ErrorPage'
const queryClient = new QueryClient()

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: Root.loader(queryClient)
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
    element: <DashboardLayout />,
    errorElement: <ErrorPage />,
    loader: DashboardLayout.loader(queryClient),
    children: PROTECTED_PAGES.map(({ path, loader, element, children }) => ({
      path,
      loader,
      element: element,
      children: children
    }))
  }
])
