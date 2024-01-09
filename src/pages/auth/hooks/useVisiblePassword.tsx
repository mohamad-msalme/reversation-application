import React from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton, InputAdornment } from '@mui/material'

export const useVisiblePassword = () => {
  const [showPassword, setShowPassword] = React.useState(false)

  const endAdornment = React.useMemo(
    () => (
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={() => setShowPassword(show => !show)}
          onMouseDown={e => e.preventDefault()}
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    ),
    [showPassword]
  )

  return {
    passwordType: showPassword ? 'text' : 'password',
    endAdornment
  }
}
