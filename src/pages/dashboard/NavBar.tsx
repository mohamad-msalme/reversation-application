import * as React from 'react'

import { NavBarItem } from './NavBarItem'
import { Drawer, List } from '@mui/material'
import { PROTECTED_PAGES } from '../../Routes'

type TNavBar = {
  menuState: boolean
}

export const NavBar: React.FC<TNavBar> = ({ menuState }) => {
  return (
    <Drawer>
      <List>
        {PROTECTED_PAGES.map(item => (
          <NavBarItem key={item.path} {...item} menuState={menuState} />
        ))}
      </List>
    </Drawer>
  )
}
