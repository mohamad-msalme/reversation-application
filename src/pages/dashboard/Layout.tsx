import React from 'react'
import { Header } from './Header'
import { NavBar } from './NavBar'
import { Outlet } from 'react-router-dom'
import { loader } from './loader'
import { Loading } from './loading'
import { Box, Theme, useTheme } from '@mui/material'

import './layout.scss'
import clsx from 'clsx'

export const DashboardLayout = () => {
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
        <React.Suspense fallback={<Loading />}>
          <Outlet />
        </React.Suspense>
      </Box>
    </Box>
  )
}

DashboardLayout.loader = loader
