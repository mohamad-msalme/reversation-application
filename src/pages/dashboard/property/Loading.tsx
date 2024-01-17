import React from 'react'
import { Box, CircularProgress } from '@mui/material'

export const Loading: React.FC = () => (
  <Box
    display="flex"
    width={400}
    height={200}
    justifyContent={'center'}
    alignItems="center"
  >
    <CircularProgress />
  </Box>
)
