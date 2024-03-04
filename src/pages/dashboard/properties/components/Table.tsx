import React from 'react'
import { Property } from 'models/Property'
import { GridToolbar } from './GridToolbar'
import { useTableColumns } from './useTableColumns'
import { usePropertiesData } from '../usePropertiesData'
import { PropertyOutletContext } from '..'
import { DataGrid, GridRowSelectionModel } from '@mui/x-data-grid'

type TTTable = {
  selectionModel: GridRowSelectionModel
  setSelectionModel: React.Dispatch<React.SetStateAction<GridRowSelectionModel>>
  showNotification: PropertyOutletContext['showNotification']
}

export const Table: React.FC<TTTable> = ({
  selectionModel,
  setSelectionModel,
  showNotification
}) => {
  const columns = useTableColumns()
  const { data, isLoading } = usePropertiesData(showNotification)

  return (
    <DataGrid
      rows={data}
      columns={columns}
      checkboxSelection
      loading={isLoading}
      disableRowSelectionOnClick
      slots={{ toolbar: GridToolbar }}
      rowSelectionModel={selectionModel}
      getRowId={(row: Property) => row._id}
      onRowSelectionModelChange={(...params) => setSelectionModel(params[0])}
      sx={{ border: 'none' }}
    />
  )
}
