import React from 'react'
import { Box } from '@mui/material'
import { Loading } from './Loading'
import { ReservationsType } from 'models/Reservation'
import { ReservationCards } from './ReservationCards'

export type HomePageProps = {
  title: string
  type: ReservationsType
}

export const HomePage: React.FC<HomePageProps> = ({ type, title }) => {
  return (
    <Box
      p={2}
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(18rem, 1fr))',
        gap: '2vw 2vh'
      }}
    >
      <React.Suspense fallback={<Loading />}>
        <ReservationCards title={title} type={type} />
      </React.Suspense>
    </Box>
  )
}
