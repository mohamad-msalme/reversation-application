import React from 'react'
import { Box } from '@mui/material'
import { Header } from './Header'
import { NavBar } from './NavBar'
import { useIsAuth } from 'services/useIsAuth'
import { Outlet, useLocation } from 'react-router-dom'

export const DashboardLayout: React.FC = () => {
  const location = useLocation()
  useIsAuth({
    enabled: location.state !== 'fromAuth'
  })
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
