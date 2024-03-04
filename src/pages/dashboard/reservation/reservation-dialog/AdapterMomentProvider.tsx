import React from 'react'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider } from '@mui/x-date-pickers'

export const AdapterMomentProvider: React.FC<React.PropsWithChildren> = ({
  children
}) => (
  <LocalizationProvider dateAdapter={AdapterMoment}>
    {children}
  </LocalizationProvider>
)
