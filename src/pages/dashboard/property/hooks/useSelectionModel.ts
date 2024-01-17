import React from 'react'
import { GridRowSelectionModel } from '@mui/x-data-grid'

export const useSelectionModel = () => React.useState<GridRowSelectionModel>([])
