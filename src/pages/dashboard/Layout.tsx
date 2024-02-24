import React from 'react'
import { Header } from './Header'
import { NavBar } from './NavBar'
import { Outlet } from 'react-router-dom'
import { Backdrop, Box, CircularProgress, Theme, useTheme } from '@mui/material'

import './layout.scss'
import clsx from 'clsx'

export const DashboardLayout: React.FC = () => {
  const isDark = useTheme<Theme>().palette.mode === 'dark'
  const [menuIcon, setMenuIcon] = React.useState(false)
  return (
    <Box className="container">
      <Box className="header">
        <Header menuState={menuIcon} onMenuClick={setMenuIcon} />
      </Box>
      <Box className="nav-bar">
        <NavBar onMenuClick={setMenuIcon} menuState={menuIcon} />
      </Box>
      <Box
        className={clsx('main', {
          'main--dark': isDark
        })}
      >
        <React.Suspense
          fallback={
            <div
              style={{
                width: '100%',
                height: '100%'
              }}
            >
              <Backdrop
                sx={{
                  color: '#fff',
                  zIndex: theme => theme.zIndex.drawer + 1
                }}
                open
              >
                <CircularProgress color="primary" />
              </Backdrop>
            </div>
          }
        >
          <Outlet />
        </React.Suspense>
      </Box>
    </Box>
  )
}
