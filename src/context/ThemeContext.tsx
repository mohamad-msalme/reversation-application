import React from 'react'
import { PaletteMode } from '@mui/material'

export type ThemeContextType = {
  theme: PaletteMode
  setTheme: (theme: PaletteMode) => void
}

export const ThemeContext = React.createContext<ThemeContextType>({
  theme: 'light',
  setTheme(theme) {
    console.log(theme)
  }
})
