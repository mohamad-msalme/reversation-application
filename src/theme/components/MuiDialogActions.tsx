/* eslint-disable @typescript-eslint/no-unused-vars */

import { Components, Palette } from '@mui/material'

export const MuiDialogActions = (
  _props: Palette
): Components['MuiDialogActions'] => {
  return {
    defaultProps: {
      sx: {
        justifyContent: 'center'
      }
    }
  }
}
