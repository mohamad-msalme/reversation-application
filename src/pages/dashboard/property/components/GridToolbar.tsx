import React from 'react'
import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarQuickFilter
} from '@mui/x-data-grid'

export const GridToolbar: React.FC = () => {
  return (
    <GridToolbarContainer
      sx={{
        padding: 2,
        gap: 2
      }}
    >
      <GridToolbarQuickFilter
        sx={{
          marginRight: 'auto',
          padding: 2
        }}
      />
      <GridToolbarColumnsButton />
      <GridToolbarExport />
      <GridToolbarDensitySelector />
    </GridToolbarContainer>
  )
}
