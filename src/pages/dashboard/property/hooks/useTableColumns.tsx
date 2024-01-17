import React from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility'

import { Property } from 'models/Property'
import { useNavigate } from 'react-router-dom'
import { dateFormatter } from 'utils/dateFormater'
import { Delete, EditNote } from '@mui/icons-material'
import { GridColDef, GridActionsCellItem } from '@mui/x-data-grid'

const COL_DEF: GridColDef<Property> = {
  field: '',
  headerAlign: 'center',
  align: 'center',
  flex: 1,
  filterable: false
}
export const useTableColumns = () => {
  const navigate = useNavigate()
  return React.useMemo<GridColDef<Property>[]>(
    () => [
      {
        ...COL_DEF,
        field: 'name',
        headerName: 'Name'
      },
      {
        ...COL_DEF,
        field: 'serialNumber',
        headerName: 'Serial number'
      },
      {
        ...COL_DEF,
        field: 'phone',
        headerName: 'Phone'
      },
      {
        ...COL_DEF,
        field: 'updatedAt',
        headerName: 'Date',
        valueFormatter: dateFormatter
      },
      {
        field: 'actions',
        type: 'actions',
        getActions: params => {
          return [
            <GridActionsCellItem
              label="View"
              key="View"
              icon={<VisibilityIcon color="primary" />}
              onClick={() => navigate(`view/${params.row._id}`)}
            />,
            <GridActionsCellItem
              label="Edit"
              showInMenu
              key="edit"
              icon={<EditNote color="primary" />}
              onClick={() => navigate(`edit/${params.row._id}`)}
            />,
            <GridActionsCellItem
              label="Delete"
              showInMenu
              key="delete"
              icon={<Delete color="error" />}
              onClick={() => navigate(`delete/${params.row._id}`)}
            />
          ]
        }
      }
    ],
    [navigate]
  )
}
