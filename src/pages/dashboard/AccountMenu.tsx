/* eslint-disable @typescript-eslint/no-floating-promises */
import React from 'react'

import Person2Icon from '@mui/icons-material/Person2'
import SettingsIcon from '@mui/icons-material/Settings'
import { Logout } from '@mui/icons-material'
import { useLogout } from 'services/useLogout'
import {
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip
} from '@mui/material'

export const AccountMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const logout = useLogout()
  return (
    <React.Fragment>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <SettingsIcon />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Person2Icon />
          </ListItemIcon>
          <ListItemText>Profile</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            logout().then(() => handleClose())
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  )
}
