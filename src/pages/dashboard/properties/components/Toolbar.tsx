import React from 'react'

import { useToolbarClick } from './useToolbarClick'
import { Add, Delete, EditNote } from '@mui/icons-material'
import { GridRowSelectionModel } from '@mui/x-data-grid'
import { Button, ButtonGroup, Theme, useMediaQuery } from '@mui/material'

export const Toolbar: React.FC<TToolbar> = ({ selectionModel }) => {
  const canEdit = selectionModel.length === 1
  const isMobile = useMediaQuery<Theme>(theme => theme.breakpoints.down('sm'))
  const handleClick = useToolbarClick(selectionModel)
  return (
    <ButtonGroup size={isMobile ? 'small' : 'medium'}>
      <Button startIcon={<Add />} name="create" onClick={handleClick}>
        Create
      </Button>
      <Button
        startIcon={<EditNote />}
        disabled={!canEdit}
        name="edit"
        color="info"
        onClick={handleClick}
      >
        Edit
      </Button>
      <Button
        startIcon={<Delete />}
        disabled={!canEdit}
        color="error"
        name="delete"
        onClick={handleClick}
      >
        Delete
      </Button>
    </ButtonGroup>
  )
}

type TToolbar = {
  selectionModel: GridRowSelectionModel
}
