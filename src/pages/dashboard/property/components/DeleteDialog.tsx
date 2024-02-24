import React from 'react'
import CloseIcon from '@mui/icons-material/Close'

import { useNavigate } from 'react-router-dom'
import { DeleteDialogAction } from './DeleteDialogAction'
import { DeleteDialogContent } from './DeleteDialogContent'
import { DialogTitle, IconButton, Dialog } from '@mui/material'

const DeleteDialog: React.FC = () => {
  const navigate = useNavigate()
  const [errMsg, setErrorMsg] = React.useState('')
  const [successMsg, setSuccessMsg] = React.useState('')

  const close = () => navigate('/property')

  return (
    <Dialog onClose={close} open={true}>
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
      <DeleteDialogContent errMsg={errMsg} successMsg={successMsg} />
      <DeleteDialogAction
        setErrorMsg={setErrorMsg}
        setSuccessMsg={setSuccessMsg}
      />
    </Dialog>
  )
}

export default DeleteDialog
