import React from 'react'
import { Box } from '@mui/material'
import { PropertiesCombobox } from './PropertiesCombobox'
import { CreateReservationBtn } from './CreateReservationBtn'

export const Toolbar: React.FC = () => {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <CreateReservationBtn />
      <PropertiesCombobox />
    </Box>
  )
}
