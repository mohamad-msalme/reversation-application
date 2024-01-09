import { Components, Palette } from '@mui/material'
import { MuiLink } from './MuiLink'

export const components = (props: Palette): Components => {
  console.log(props)
  return {
    MuiLink: MuiLink(props)
  }
}
