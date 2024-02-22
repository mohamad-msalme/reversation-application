import React from 'react'
import { ThemeMode } from 'components/theme-mode'
import { AccountMenu } from './AccountMenu'
import {
  AppBar,
  Box,
  IconButton,
  Theme,
  Toolbar,
  useMediaQuery
} from '@mui/material'

import MenuIcon from '@mui/icons-material/Menu'

type THeader = {
  menuState: boolean
  onMenuClick: React.Dispatch<React.SetStateAction<boolean>>
}
export const Header: React.FC<THeader> = ({ onMenuClick, menuState }) => {
  const isMobile = useMediaQuery<Theme>(theme => theme.breakpoints.down('sm'))
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          onClick={() => onMenuClick(!menuState)}
          color="inherit"
          aria-label="open drawer"
          edge="start"
          sx={{
            transition: 'all 0.4s',
            opacity: !isMobile ? 0 : 1,
            pointerEvents: !isMobile ? 'none' : 'all '
          }}
        >
          <MenuIcon />
        </IconButton>
        <Box display="flex" alignItems="center" columnGap={1} ml="auto">
          <ThemeMode />
          <AccountMenu />
        </Box>
      </Toolbar>
    </AppBar>
  )
}
