import { GridValueFormatterParams } from '@mui/x-data-grid'

export const dateFormatter = (params: GridValueFormatterParams<Date>) =>
  new Date(params.value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  })
