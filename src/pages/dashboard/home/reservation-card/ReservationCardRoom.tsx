import React from 'react'
import ApartmentIcon from '@mui/icons-material/Apartment'

import { useReservationCard } from './ReservationCardContext'
import { Box, Skeleton, Typography } from '@mui/material'

export const ReservationCardRoom: React.FC = () => {
  const { reservation, isLoading } = useReservationCard()
  return (
    <Box display="flex" columnGap={1} alignItems="center">
      <ApartmentIcon color="info" />
      <b>Room: </b>
      <Typography variant="body1">
        {isLoading ? (
          <Skeleton width={150} height={50} />
        ) : (
          reservation?.property?.name
        )}
      </Typography>
    </Box>
  )
}
