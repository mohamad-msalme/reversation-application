/* eslint-disable @typescript-eslint/no-unused-vars */

import { Components, Palette } from '@mui/material'

export const MuiButtonGroup = (
  _props: Palette
): Components['MuiButtonGroup'] => {
  return {
    defaultProps: {
      variant: 'contained',
      sx: {
        boxShadow: 'none',
        justifyContent: 'center',
        alignItems: 'center',
        columnGap: 2,
        '& .MuiButtonBase-root.MuiButton-root': {
          border: 'none',
          borderRadius: '4px'
        }
      }
    }
  }
}
