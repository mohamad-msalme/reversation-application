import React from 'react'
import { Box } from '@mui/material'
import { useIsAuth } from 'services/useIsAuth'

export const Root: React.FC = () => {
  useIsAuth()
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
        backgroundImage: 'linear-gradient(-135deg,#c850c0,#4158d0)'
      }}
    />
  )
}
