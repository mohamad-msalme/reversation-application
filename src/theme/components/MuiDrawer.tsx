import { Components, Palette } from '@mui/material'

export const MuiDrawer = (_props: Palette): Components['MuiDrawer'] => {
  return {
    defaultProps: {
      anchor: 'left',
      open: true,
      variant: 'persistent',
      sx: {
        height: '100%'
      },
      PaperProps: {
        sx: {
          position: 'static'
        }
      }
    }
  }
}
