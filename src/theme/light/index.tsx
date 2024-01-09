import { typography } from '../typography'
import { components } from '../components'
import { paletteLight } from './palette'
import { createTheme, responsiveFontSizes } from '@mui/material'

export const LightTheme = responsiveFontSizes(
  createTheme({
    palette: paletteLight,
    components: components(paletteLight),
    typography: typography(paletteLight)
  })
)
