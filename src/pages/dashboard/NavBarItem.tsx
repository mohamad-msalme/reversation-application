import React from 'react'
import { TPROTECTED_PAGES } from 'src/ProtectedPages'
import { Link, useLocation } from 'react-router-dom'

import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Theme,
  Tooltip,
  useMediaQuery
} from '@mui/material'

type TNavBarItem = TPROTECTED_PAGES & {
  menuState: boolean
}

export const NavBarItem: React.FC<TNavBarItem> = ({
  path,
  label,
  menuState,
  icon
}) => {
  const isTablet =
    useMediaQuery<Theme>(theme => theme.breakpoints.down('md')) || menuState
  const isMobile =
    useMediaQuery<Theme>(theme => theme.breakpoints.down('sm')) || menuState
  const location = useLocation()
  const Item = (
    <ListItemButton
      component={Link}
      to={path ?? '/home/arrivals'}
      selected={
        location.pathname === path ||
        location.pathname.includes(path ?? '/home/arrivals')
      }
    >
      <ListItemIcon
        sx={theme => ({
          justifyContent: isMobile ? 'normal' : isTablet ? 'center' : 'normal',
          minWidth: isMobile ? '56px' : isTablet ? 'fit-content' : '56px',
          color: theme.palette.primary.main
        })}
      >
        {icon}
      </ListItemIcon>
      <ListItemText
        sx={{
          display: isMobile ? 'normal' : isTablet ? 'none' : 'normal'
        }}
        primary={label}
      />
    </ListItemButton>
  )

  return (
    <ListItem key={path}>
      {isTablet && !isMobile ? (
        <Tooltip title={label} placement="right">
          {Item}
        </Tooltip>
      ) : (
        Item
      )}
    </ListItem>
  )
}
