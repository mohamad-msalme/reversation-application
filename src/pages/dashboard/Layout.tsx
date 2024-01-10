import React from 'react'
import { Box } from '@mui/material'
import { Outlet } from 'react-router'
import { Header } from './Header'
import { NavBar } from './NavBar'
import { useIsAuth } from 'services/useIsAuth'

export const DashboardLayout: React.FC = () => {
  useIsAuth()
  const [menuIcon, setMenuIcon] = React.useState(false)

  return (
    <Box
      sx={{
        display: 'grid',
        minHeight: '100vh',
        gridTemplateColumns:
          '[drawer] max-content [full-start] minmax(2vw, 4vw) repeat(9,[col-start] 1fr [col-end]) [full-end] minmax(2vw, 4vw)',
        gridTemplateRows: 'auto 1fr'
      }}
    >
      <Box
        sx={{
          gridColumn: 'drawer / -1'
        }}
      >
        <Header menuState={menuIcon} onMenuClick={setMenuIcon} />
      </Box>
      <Box
        sx={{
          gridRow: 2
        }}
      >
        <NavBar menuState={menuIcon} />
      </Box>
      <Box
        sx={{
          gridColumn: 'col-start 1 / full-end'
        }}
      >
        <Outlet />
      </Box>
    </Box>
  )
}
