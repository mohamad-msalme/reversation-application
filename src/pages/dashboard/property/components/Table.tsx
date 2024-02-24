import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Property } from 'models/Property'
import { GridToolbar } from './GridToolbar'
import { useLoaderData } from 'react-router'
import { useTableColumns } from '../hooks/useTableColumns'
import { PropertiesQuery } from 'services/fetchProperties'
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

  const { initialData, success } = useLoaderData() as {
    success: boolean
    initialData: Property[]
  }

  const successRef = React.useRef<boolean>(success)

  const { data, isLoading } = useQuery({
    ...PropertiesQuery(),
    initialData
  })

  React.useEffect(() => {
    if (!successRef.current) {
      showNotification(
        'Somthing went wrong by loading Proprties, please reload',
        'error'
      )
    }
  }, [])

  return (
    <DataGrid
      columns={columns}
      rows={data ?? initialData}
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
