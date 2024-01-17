import { MuiLink } from './MuiLink'
import { MuiDrawer } from './MuiDrawer'
import { Components, Palette } from '@mui/material'
import { MuiButtonGroup } from './MuiButtonGroup'
import { MuiDialogActions } from './MuiDialogActions'

export const components = (props: Palette): Components => {
  return {
    MuiLink: MuiLink(props),
    MuiDrawer: MuiDrawer(props),
    MuiButtonGroup: MuiButtonGroup(props),
    MuiDialogActions: MuiDialogActions(props)
  }
}
