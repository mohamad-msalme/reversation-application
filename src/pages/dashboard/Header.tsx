import React from 'react'
import { ThemeMode } from 'components/theme-mode'
import { AccountMenu } from './AccountMenu'
import { AppBar, Badge, Box, IconButton, Toolbar } from '@mui/material'

import NotificationsIcon from '@mui/icons-material/Notifications'

export const Header: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box display="flex" alignItems="center" columnGap={1} ml="auto">
          <ThemeMode />
          <IconButton>
            <Badge badgeContent={4} color="info">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <AccountMenu />
        </Box>
      </Toolbar>
    </AppBar>
  )
}
