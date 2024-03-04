import React from 'react'
import { FilterByType } from './FilterByType'
import { Box, Theme, useMediaQuery } from '@mui/material'
import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarQuickFilter
} from '@mui/x-data-grid'

export const GridToolbar: React.FC = () => {
  const isLargeScreen = useMediaQuery<Theme>(theme =>
    theme.breakpoints.up('lg')
  )
  return (
    <GridToolbarContainer
      sx={{
        padding: 2,
        gap: 2,
        flexDirection: isLargeScreen ? 'row' : 'column',
        justifyContent: isLargeScreen ? 'space-around' : 'normal'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 2,
          alignItems: 'baseline'
        }}
      >
        <GridToolbarQuickFilter />
        <Box display="flex" flexDirection="column">
          <FilterByType />
        </Box>
      </Box>
      <Box alignSelf="center" display="flex" gap={2}>
        <GridToolbarColumnsButton />
        <GridToolbarExport />
        <GridToolbarDensitySelector />
      </Box>
    </GridToolbarContainer>
  )
}
