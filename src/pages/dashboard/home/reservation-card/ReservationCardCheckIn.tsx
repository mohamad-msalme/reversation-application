/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useReservationCard } from './ReservationCardContext'
import { Box, Icon, Skeleton, Typography } from '@mui/material'

export const ReservationCardCheckIn: React.FC = () => {
  const { reservation, isLoading } = useReservationCard()
  return (
    <Box display="flex" columnGap={1} alignItems="center">
      <Icon color="info">
        <CheckCircleIcon />
      </Icon>
      <b>Check in: </b>
      <Typography
        sx={{
          flex: 1
        }}
        variant="body1"
      >
        {isLoading ? (
          <Skeleton animation="wave" height={50} />
        ) : (
          new Date(reservation!.checkin).toDateString()
        )}
      </Typography>
    </Box>
  )
}
