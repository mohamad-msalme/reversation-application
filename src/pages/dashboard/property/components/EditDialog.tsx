import React from 'react'

import CloseIcon from '@mui/icons-material/Close'

import { Loading } from '../Loading'
import { EditDialogContent } from './EditDialogContent'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import {
  DialogTitle,
  IconButton,
  Dialog as MuiDialog,
  Theme,
  useMediaQuery
} from '@mui/material'

const EditDialog: React.FC<TDialog> = ({ mode }) => {
  const outleContext = useOutletContext()
  console.log({ EditDialog: outleContext })
  const { id } = useParams()
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
        <EditDialogContent mode={mode} id={id} handelCancel={closeDialog} />
      </React.Suspense>
    </MuiDialog>
  )
}

export type TMode = 'Edit' | 'View' | 'New'

type TDialog = {
  mode: TMode
}

export default EditDialog
