import React from 'react'

import HomeIcon from '@mui/icons-material/Home'
import Property from 'pages/dashboard/property'
import EditDialog from 'pages/dashboard/property/components/EditDialog'
import Reservation from 'pages/dashboard/reservation'
import DeleteDialog from 'pages/dashboard/property/components/DeleteDialog'
import ApartmentIcon from '@mui/icons-material/Apartment'
import EditCalendarIcon from '@mui/icons-material/EditCalendar'
import HomeLayout from 'pages/dashboard/home/HomeLayout'
import { HomePage } from 'pages/dashboard/home/HomePage'

export type TPROTECTED_PAGES = {
  path: string
  label: string
  icon: React.ReactNode
  element?: React.ReactNode
  children?: TPROTECTED_PAGES[]
}

export const PROTECTED_PAGES: TPROTECTED_PAGES[] = [
  {
    path: '/home',
    label: 'Home',
    icon: <HomeIcon />,
    element: <HomeLayout />,
    children: [
      {
        path: 'arrivals',
        element: <HomePage title="Arrivals" type="arrivals" />,
        icon: <HomeIcon />,
        label: 'Arrivals'
      },
      {
        path: 'departure',
        element: <HomePage title="Departure" type="departures" />,
        icon: <HomeIcon />,
        label: 'Departure'
      },
      {
        path: 'staysover',
        element: <HomePage title="Stays over" type="stayovers" />,
        icon: <HomeIcon />,
        label: 'Stays-over'
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
    children: [
      {
        path: 'edit/:id',

        label: 'Edit Property',
        icon: <ApartmentIcon />,
        element: <EditDialog mode="Edit" />
      },
      {
        path: 'new',
        label: 'Create new property',

        icon: <ApartmentIcon />,
        element: <EditDialog mode="New" />
      },
      {
        path: 'view/:id',
        label: 'View property',

        icon: <ApartmentIcon />,
        element: <EditDialog mode="View" />
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
