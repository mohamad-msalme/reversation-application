import React from 'react'

import { Outlet } from 'react-router-dom'
import { Background } from 'pages/Background'
import { AuthLeftSide } from './AuthLeftSide'
import { Box, Theme, useMediaQuery } from '@mui/material'

export const AuthLayout: React.FC = () => {
  const isSmallerThanMd = useMediaQuery<Theme>(theme =>
    theme.breakpoints.down('md')
  )

  return (
    <Background>
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
    </Background>
  )
}
