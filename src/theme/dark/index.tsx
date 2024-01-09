import { typography } from '../typography'
import { components } from '../components'
import { paletteDark } from './palette'
import { createTheme, responsiveFontSizes } from '@mui/material'

export const DarkTheme = responsiveFontSizes(
  createTheme({
    palette: paletteDark,
    components: components(paletteDark),
    typography: typography(paletteDark)
  })
)
