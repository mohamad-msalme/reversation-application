import React from 'react'
import { SignIn } from 'pages/auth/pages/sign-in'
import { SignUp } from 'pages/auth/pages/sign-up'
import { AuthLayout } from 'pages/auth'
import { ProtectedRoute } from './ProtectedRoute'
import { ForgetPassword } from 'pages/auth/pages/forget-password'
import { DashboardLayout } from 'pages/dashboard/Layout'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute
        unauthenticatedElement={<Navigate to="login" />}
        authenticatedElement={<Navigate to="/one" />}
      />
    )
  },
  {
    element: (
      <ProtectedRoute
        unauthenticatedElement={<AuthLayout />}
        authenticatedElement={<Navigate to="/one" />}
      />
    ),
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
    // element: (
    //   <ProtectedRoute
    //     unauthenticatedElement={<Navigate to="login" />}
    //     authenticatedElement={<DashboardLayout />}
    //   />
    // ),
    children: [
      {
        path: '/one',
        element: <div>one</div>
      },
      {
        path: '/two',
        element: <div>Two</div>
      }
    ]
  }
])

export const ReactRouterProvider = () => <RouterProvider router={router} />
