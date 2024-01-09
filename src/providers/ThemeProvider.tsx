/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react'

import { DarkTheme } from 'theme/dark'
import { LightTheme } from 'theme/light'
import { ThemeContext } from 'context/ThemeContext'
import { useLocalStorage } from 'hooks/useLocalStorage'
import { CssBaseline, PaletteMode } from '@mui/material'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'

export const ThemeProvider: React.FC<React.PropsWithChildren> = ({
  children
}) => {
  const themeState = useLocalStorage<PaletteMode>('prefered-theme', 'light')
  const theme = themeState.value === 'light' ? LightTheme : DarkTheme

  const contextValue = React.useMemo(
    () => ({ theme: themeState.value!, setTheme: themeState.setValue }),
    [themeState.value, themeState.setValue]
  )
  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline enableColorScheme>{children}</CssBaseline>
      </MuiThemeProvider>
    </ThemeContext.Provider>
  )
}
