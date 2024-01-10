import { Components, Palette } from '@mui/material'

export const MuiDrawer = (props: Palette): Components['MuiDrawer'] => {
  console.log(props)
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
