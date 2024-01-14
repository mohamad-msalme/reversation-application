import { Box, Button } from '@mui/material'
import React from 'react'

type TToolbar = {
  selectionModel: number[]
}
export const Toolbar: React.FC<TToolbar> = ({ selectionModel }) => {
  const canDelete = selectionModel.length > 0
  const canEdit = selectionModel.length === 1
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    switch (e.currentTarget.name) {
      case 'create':
        console.log('Create button clicked')
        break
      case 'edit':
        console.log('Edit button clicked')
        break
      case 'delete':
        console.log('Delete button clicked')
        break
      default:
        break
    }
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Button color="primary" name="create" onClick={handleClick}>
        Create
      </Button>
      <Button
        disabled={!canEdit}
        color="secondary"
        name="edit"
        onClick={handleClick}
      >
        Edit
      </Button>
      <Button
        disabled={!canDelete}
        color="error"
        name="delete"
        onClick={handleClick}
      >
        Delete
      </Button>
    </Box>
  )
}
