import React from 'react'
import CloseIcon from '@mui/icons-material/Close'

import { Delete } from '@mui/icons-material'
import { isAxiosError } from 'axios'
import { useDeleteProperties } from 'services/useDeleteProperties'
import { PropertyOutletContext } from '..'
import { Button, DialogActions } from '@mui/material'
import { useParams, useNavigate, useOutletContext } from 'react-router-dom'

type DeleteDialogActionProps = {
  isAllowed: boolean
}
export const DeleteDialogAction: React.FC<DeleteDialogActionProps> = ({
  isAllowed
}) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const close = () => navigate(-1)

  const { mutateAsync, isPending } = useDeleteProperties()

  const { showNotification } = useOutletContext<PropertyOutletContext>()

  const handelDelete = async () => {
    try {
      await mutateAsync(id, {
        onSuccess: () => {
          showNotification('Property has been deleted successfully', 'success')
        }
      })
      close()
    } catch (error) {
      if (isAxiosError(error) && error.status === 401) throw error
      showNotification('Error during delete property', 'error')
    }
  }

  return (
    <DialogActions>
      <Button
        disabled={!isAllowed ?? isPending}
        variant="contained"
        name="delete"
        color="error"
        startIcon={<Delete />}
        onClick={() => {
          void handelDelete()
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
  )
}
