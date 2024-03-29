/* eslint-disable @typescript-eslint/no-unused-vars */
import { Components, Palette } from '@mui/material'

export const MuiLink = (_props: Palette): Components['MuiLink'] => {
  return {
    defaultProps: {
      sx: {
        cursor: 'pointer'
      },
      underline: 'none'
    }
  }
}
