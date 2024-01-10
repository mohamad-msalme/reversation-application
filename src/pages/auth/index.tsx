import React from 'react'

import { Outlet } from 'react-router-dom'
import { AuthLeftSide } from './AuthLeftSide'
import { Box, Theme, useMediaQuery } from '@mui/material'

export const AuthLayout: React.FC = () => {
  const isSmallerThanMd = useMediaQuery<Theme>(theme =>
    theme.breakpoints.down('md')
  )

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
    >
      <Box
        sx={theme => ({
          backgroundColor: theme.palette.background.paper,
          borderRadius: '10px',
          boxShadow: theme.shadows[10],
          display: 'flex',
          columnGap: theme.spacing(10),
          padding: isSmallerThanMd ? theme.spacing(5) : theme.spacing(10)
        })}
      >
        <AuthLeftSide />
        <Box flex={1}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}
