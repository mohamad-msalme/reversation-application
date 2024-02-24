/* eslint-disable @typescript-eslint/no-floating-promises */
import React from 'react'

import HomeIcon from '@mui/icons-material/Home'
import Property from 'pages/dashboard/property'
import DeleteDialog from 'pages/dashboard/property/components/DeleteDialog'
import ApartmentIcon from '@mui/icons-material/Apartment'
import EditCalendarIcon from '@mui/icons-material/EditCalendar'
import HomeLayout from 'pages/dashboard/home/HomeLayout'
import { HomePage } from 'pages/dashboard/home/HomePage'
import EditDialog from 'pages/dashboard/property/components/EditDialog'
import Reservation from 'pages/dashboard/reservation'
import { RouteObject } from 'react-router-dom'
import { QueryClient } from '@tanstack/react-query'

export type TPROTECTED_PAGES = {
  path?: string
  label: string
  icon: React.ReactNode
  element?: React.ReactNode
  children?: TPROTECTED_PAGES[]
  loader?: RouteObject['loader']
}

const queryClient = new QueryClient()
export const PROTECTED_PAGES: TPROTECTED_PAGES[] = [
  {
    label: 'Home',
    icon: <HomeIcon />,
    element: <HomeLayout />,
    children: [
      {
        path: '/home/arrivals',
        element: <HomePage title="Arrivals" type="arrivals" />,
        icon: <HomeIcon />,
        label: 'Arrivals',
        loader: HomeLayout.loader.bind(undefined, queryClient, 'arrivals')
      },
      {
        path: '/home/departure',
        element: <HomePage title="Departure" type="departures" />,
        icon: <HomeIcon />,
        label: 'Departure',
        loader: HomeLayout.loader.bind(undefined, queryClient, 'departures')
      },
      {
        path: '/home/staysover',
        element: <HomePage title="Stays over" type="stayovers" />,
        icon: <HomeIcon />,
        label: 'Stays-over',
        loader: HomeLayout.loader.bind(undefined, queryClient, 'stayovers')
      }
    ]
  },
  {
    path: '/reservation',
    label: 'Reservation ',
    icon: <EditCalendarIcon />,
    element: <Reservation />
  },
  {
    path: '/property',
    label: 'Property',
    icon: <ApartmentIcon />,
    element: <Property />,
    loader: Property.loader.bind(undefined, queryClient),
    children: [
      {
        path: 'edit/:id',

        label: 'Edit Property',
        icon: <ApartmentIcon />,
        element: <EditDialog mode="Edit" />,
        loader: EditDialog.loader(queryClient)
      },
      {
        path: 'new',
        label: 'Create new property',
        loader: EditDialog.loader(queryClient),
        icon: <ApartmentIcon />,
        element: <EditDialog mode="New" />
      },
      {
        path: 'view/:id',
        label: 'View property',
        icon: <ApartmentIcon />,
        element: <EditDialog mode="View" />,
        loader: EditDialog.loader(queryClient)
      },
      {
        path: 'delete/:id',
        label: 'Delete property',

        icon: <ApartmentIcon />,
        element: <DeleteDialog />
      }
    ]
  }
]
