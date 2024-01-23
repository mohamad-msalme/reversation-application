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
  const isMobile =
    useMediaQuery<Theme>(theme => theme.breakpoints.down('md')) || menuState
  const location = useLocation()
  const Item = (
    <ListItemButton
      component={Link}
      to={path}
      selected={location.pathname === path || location.pathname.includes(path)}
    >
      <ListItemIcon
        sx={theme => ({
          justifyContent: isMobile ? 'center' : 'normal',
          minWidth: isMobile ? 'fit-content' : '56px',
          color: theme.palette.primary.main
        })}
      >
        {icon}
      </ListItemIcon>
      <ListItemText
        sx={{
          display: isMobile ? 'none' : 'normal'
        }}
        primary={label}
      />
    </ListItemButton>
  )

  return (
    <ListItem key={path}>
      {isMobile ? (
        <Tooltip title={label} placement="right">
          {Item}
        </Tooltip>
      ) : (
        Item
      )}
    </ListItem>
  )
}
