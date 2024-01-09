import createTypography from '@mui/material/styles/createTypography'
import { Palette } from '@mui/material'

export const typography = (palette: Palette) =>
  createTypography(palette, {
    fontSize: 14,
    fontFamily: 'Inter, sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    htmlFontSize: 16,
    allVariants: {
      fontWeight: 400
    }
  })
