import React from 'react'
import { Outlet } from 'react-router'
import { Header } from './Header'
import TemporaryDrawer from './DashboardDrawer'
import { Box, Stack } from '@mui/material'
export const DashboardLayout: React.FC = () => {
  return (
    <Stack>
      <Header />
      <Box>
        <TemporaryDrawer />

        <Outlet />
      </Box>
    </Stack>
  )
}
