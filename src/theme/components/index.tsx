import { MuiLink } from './MuiLink'
import { MuiDrawer } from './MuiDrawer'
import { MuiButtonGroup } from './MuiButtonGroup'
import { MuiDialogActions } from './MuiDialogActions'
import { Components, Palette } from '@mui/material'

export const components = (props: Palette): Components => {
  return {
    MuiLink: MuiLink(props),
    MuiDrawer: MuiDrawer(props),
    MuiButtonGroup: MuiButtonGroup(props),
    MuiDialogActions: MuiDialogActions(props)
  }
}
