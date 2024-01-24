import React from 'react'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'

import { useReservationCard } from './ReservationCardContext'
import { Box, Skeleton, Typography } from '@mui/material'

export const ReservationCardCheckOut: React.FC = () => {
  const { reservation, isLoading } = useReservationCard()
  return (
    <Box display="flex" columnGap={1} alignItems="center">
      <ExitToAppIcon color="info" />
      <b>Check out: </b>
      <Typography variant="body1">
        {isLoading ? (
          <Skeleton width={150} height={50} />
        ) : (
          new Date(reservation?.checkout || '').toDateString()
        )}
      </Typography>
    </Box>
  )
}
