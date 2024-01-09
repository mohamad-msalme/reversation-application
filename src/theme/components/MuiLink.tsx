import { Components, Palette } from '@mui/material'

export const MuiLink = (props: Palette): Components['MuiLink'] => {
  console.log(props)
  return {
    defaultProps: {
      sx: {
        cursor: 'pointer'
      },
      underline: 'none'
    }
  }
}
