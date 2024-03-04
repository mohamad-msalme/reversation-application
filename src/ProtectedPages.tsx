/* eslint-disable @typescript-eslint/no-floating-promises */
import React from 'react'

import { HomePage } from 'pages/dashboard/home/HomePage'
import { RouteObject } from 'react-router-dom'
import { QueryClient } from '@tanstack/react-query'

import HomeIcon from '@mui/icons-material/Home'
import Property from 'pages/dashboard/properties'
import HomeLayout from 'pages/dashboard/home/HomeLayout'
import EditDialog from 'pages/dashboard/properties/property-edit-dialog/EditDialog'
import Reservation from 'pages/dashboard/reservation'
import DeleteDialog from 'pages/dashboard/properties/property-delete-dialog/DeleteDialog'
import ApartmentIcon from '@mui/icons-material/Apartment'
import EditCalendarIcon from '@mui/icons-material/EditCalendar'
import { ReservationDialog } from 'pages/dashboard/reservation/reservation-dialog'

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
    path: '/reservations',
    label: 'Reservations',
    icon: <EditCalendarIcon />,
    element: <Reservation />,
    loader: Reservation.loader(queryClient),
    children: [
      {
        path: 'new',
        label: 'Reservation ',
        icon: <EditCalendarIcon />,
        element: <ReservationDialog />,
        loader: ReservationDialog.loader(queryClient)
      },
      {
        path: ':id',
        label: 'Reservation ',
        icon: <EditCalendarIcon />,
        element: <ReservationDialog />,
        loader: ReservationDialog.loader(queryClient)
      }
    ]
  },
  {
    path: '/properties',
    label: 'Properties',
    icon: <ApartmentIcon />,
    element: <Property />,
    loader: Property.loader(queryClient),
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
        element: <DeleteDialog />,
        loader: DeleteDialog.loader(queryClient)
      }
    ]
  }
]
