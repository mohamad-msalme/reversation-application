import { MuiLink } from './MuiLink'
import { MuiDrawer } from './MuiDrawer'
import { Components, Palette } from '@mui/material'

export const components = (props: Palette): Components => {
  return {
    MuiLink: MuiLink(props),
    MuiDrawer: MuiDrawer(props)
  }
}
