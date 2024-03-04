import React from 'react'
import { Box, CircularProgress } from '@mui/material'

export const Loading: React.FC = () => (
  <Box
    display="flex"
    width={'100%'}
    height={400}
    justifyContent={'center'}
    alignItems="center"
  >
    <CircularProgress color="primary" />
  </Box>
)
