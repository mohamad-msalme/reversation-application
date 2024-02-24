import React from 'react'

import CloseIcon from '@mui/icons-material/Close'

import { loader } from './loader'
import { Loading } from '../Loading'
import { useNavigate } from 'react-router-dom'
import { EditDialogContent } from './EditDialogContent'
import {
  DialogTitle,
  IconButton,
  Dialog as MuiDialog,
  Theme,
  useMediaQuery
} from '@mui/material'

const EditDialog = ({ mode }: TDialog) => {
  const navigate = useNavigate()
  const closeDialog = () => navigate('/property')
  const fullScreen = useMediaQuery<Theme>(theme => theme.breakpoints.down('sm'))

  return (
    <MuiDialog
      fullWidth
      maxWidth="lg"
      scroll="paper"
      onClose={closeDialog}
      fullScreen={fullScreen}
      open={true}
    >
      <DialogTitle>{`${mode} property`}</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={closeDialog}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8
        }}
      >
        <CloseIcon />
      </IconButton>
      <React.Suspense fallback={<Loading />}>
        <EditDialogContent mode={mode} handelCancel={closeDialog} />
      </React.Suspense>
    </MuiDialog>
  )
}

export type TMode = 'Edit' | 'View' | 'New'

type TDialog = {
  mode: TMode
}
EditDialog.loader = loader
export default EditDialog
