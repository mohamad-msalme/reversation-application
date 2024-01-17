/* eslint-disable @typescript-eslint/no-floating-promises */
import React from 'react'
import CloseIcon from '@mui/icons-material/Close'

import { Delete } from '@mui/icons-material'
import { useDeleteProperties } from 'services/useDeleteProperties'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Dialog as MuiDialog
} from '@mui/material'

const DeleteDialog: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const close = () => navigate('/property')
  const { mutateAsync } = useDeleteProperties()

  const handelDelete = async () => {
    await mutateAsync((id as string).split('_'), close)
  }

  return (
    <MuiDialog onClose={close} open={true}>
      <DialogTitle>Delete property</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={close}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <DialogContentText>
          Are you suew you want to delete this property ?
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button
          variant="contained"
          name="delete"
          color="error"
          startIcon={<Delete />}
          onClick={() => {
            handelDelete()
          }}
        >
          Delete
        </Button>
        <Button
          variant="contained"
          name="cancel"
          startIcon={<CloseIcon />}
          onClick={() => close()}
        >
          Cancel
        </Button>
      </DialogActions>
    </MuiDialog>
  )
}

export default DeleteDialog
