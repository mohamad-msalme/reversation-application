/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { useTheme } from 'hooks/useTheme'
import { IconButton, IconButtonProps } from '@mui/material'

import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'

export const ThemeMode: React.FC<IconButtonProps> = ({
  children,
  onClick,
  ...rest
}) => {
  const themeState = useTheme()
  const handelClick = (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    onClick?.(_e)
    themeState.theme === 'light'
      ? themeState.setTheme('dark')
      : themeState.setTheme('light')
  }

  return (
    <IconButton {...rest} onClick={handelClick}>
      {themeState.theme === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
    </IconButton>
  )
}
