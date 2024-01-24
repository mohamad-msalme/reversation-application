import React from 'react'
import { useReservationCard } from './ReservationCardContext'
import { Box, Skeleton, Typography } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
export const ReservationCardName: React.FC = () => {
  const { reservation, isLoading } = useReservationCard()
  return (
    <Box display="flex" columnGap={1} alignItems="center">
      <PersonIcon color="info" />
      <b>Name: </b>
      <Typography variant="body1">
        {isLoading ? <Skeleton width={150} height={50} /> : reservation?.name}
      </Typography>
    </Box>
  )
}
