import * as React from 'react'

import { NavBarItem } from './NavBarItem'
import { PROTECTED_PAGES } from './../../ProtectedPages'
import { Drawer, List, Theme, useMediaQuery } from '@mui/material'
type TNavBar = {
  menuState: boolean
  onMenuClick: React.Dispatch<React.SetStateAction<boolean>>
}

export const NavBar: React.FC<TNavBar> = ({ menuState, onMenuClick }) => {
  const isMobile = useMediaQuery<Theme>(theme => theme.breakpoints.down('sm'))
  return (
    <Drawer
      open={isMobile ? menuState : false}
      variant={isMobile ? 'temporary' : 'permanent'}
      anchor="left"
      onClose={() => onMenuClick(false)}
      sx={
        isMobile
          ? { '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 } }
          : undefined
      }
    >
      <List>
        {PROTECTED_PAGES.map(item => (
          <NavBarItem key={item.path} {...item} menuState={menuState} />
        ))}
      </List>
    </Drawer>
  )
}
