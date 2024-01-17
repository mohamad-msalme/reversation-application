import React from 'react'
import { Property } from 'models/Property'
import { GridToolbar } from './GridToolbar'
import { useTableColumns } from '../hooks/useTableColumns'
import { useGetProperties } from 'services/useGetProperties'
import { DataGrid, GridRowSelectionModel } from '@mui/x-data-grid'

type TTTable = {
  selectionModel: GridRowSelectionModel
  setSelectionModel: React.Dispatch<React.SetStateAction<GridRowSelectionModel>>
}

export const Table: React.FC<TTTable> = ({
  selectionModel,
  setSelectionModel
}) => {
  const columns = useTableColumns()
  const { data, isLoading } = useGetProperties()
  return (
    <DataGrid
      columns={columns}
      rows={data || []}
      checkboxSelection
      loading={isLoading}
      disableRowSelectionOnClick
      slots={{ toolbar: GridToolbar }}
      rowSelectionModel={selectionModel}
      getRowId={(row: Property) => row._id}
      onRowSelectionModelChange={(...params) => setSelectionModel(params[0])}
      sx={{ border: 'none' }}
    ></DataGrid>
  )
}
