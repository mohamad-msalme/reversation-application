import React from 'react'
import CloseIcon from '@mui/icons-material/Close'

import { Delete } from '@mui/icons-material'
import { useDeleteProperties } from 'services/useDeleteProperties'
import { PropertyOutletContext } from '..'
import { Button, DialogActions } from '@mui/material'
import { useParams, useNavigate, useOutletContext } from 'react-router-dom'

type DeleteDialogActionProps = {
  setSuccessMsg: React.Dispatch<React.SetStateAction<string>>
  setErrorMsg: React.Dispatch<React.SetStateAction<string>>
}
export const DeleteDialogAction: React.FC<DeleteDialogActionProps> = ({
  setSuccessMsg,
  setErrorMsg
}) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const close = () => navigate('/property')

  const { mutateAsync, isPending, isError } = useDeleteProperties()

  const { showNotification } = useOutletContext<PropertyOutletContext>()

  const handelDelete = async () => {
    const ids = (id as string).split('_')
    await mutateAsync(ids, (promiseRejected, refetch, errMsg) => {
      if (promiseRejected) {
        if (promiseRejected === ids.length) {
          setErrorMsg(`Unsuccess delete ${errMsg}`)
          setSuccessMsg('')
        } else {
          setErrorMsg(`Unsuccess delete ${errMsg}`)
          setSuccessMsg(
            `Number of Property that has been deleted Successfully: ${
              ids.length - promiseRejected
            }`
          )
          void refetch()
        }
      } else {
        setSuccessMsg('')
        setErrorMsg('')
        void refetch()
        showNotification('Property has been deleted successfully', 'success')
        close()
      }
    })
  }

  if (isError) {
    showNotification('Unsuccessfully delete property', 'error')
  }

  return (
    <DialogActions>
      <Button
        disabled={isPending}
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
