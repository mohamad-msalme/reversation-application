import React from 'react'
import { Box } from '@mui/material'
import { Loading } from './Loading'
import { HOME_TABS } from 'constants/index'
import { ReservationsType } from 'models/Reservation'
import { ReservationCards } from './ReservationCards'
import { useLocation, useOutletContext } from 'react-router'

export type HomePageProps = {
  title: string
  type: ReservationsType
}

export const HomePage: React.FC<HomePageProps> = ({ type, title }) => {
  const { pathname } = useLocation()
  const { tabIndex } = useOutletContext<{ tabIndex: number }>()
  const isPending = HOME_TABS[tabIndex] !== pathname
  return (
    <Box
      p={2}
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(18rem, 28rem))',
        gap: '2vw 2vh',
        opacity: isPending ? 0.5 : 1,
        justifyContent: 'center'
      }}
    >
      <React.Suspense fallback={<Loading />}>
        <ReservationCards title={title} type={type} />
      </React.Suspense>
    </Box>
  )
}
