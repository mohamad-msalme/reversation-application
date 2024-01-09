import React from 'react'
import { ThemeContext } from 'context/ThemeContext'

export const useTheme = () => {
  const themeContext = React.useContext(ThemeContext)
  return themeContext
}
