import { PaletteOptions as MuiPaletteOptions } from '@mui/material/styles/createPalette'

declare module '@mui/material/styles/createPalette' {
  interface PaletteOptions extends MuiPaletteOptions {
    // Add your custom palette options here
  }
}
