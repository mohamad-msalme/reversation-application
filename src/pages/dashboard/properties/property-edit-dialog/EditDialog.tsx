import React from 'react'

import { loader } from './loader'
import { Loading } from '../Loading'
import { useNavigate } from 'react-router-dom'
import { EditDialogTitle } from './EditDialogTitle'
import { EditDialogContent } from './EditDialogContent'
import { Dialog as MuiDialog, Theme, useMediaQuery } from '@mui/material'

export type TMode = 'Edit' | 'View' | 'New'

type EditDialogProps = {
  mode: TMode
}

const EditDialog = ({ mode }: EditDialogProps) => {
  const navigate = useNavigate()
  const closeDialog = () => navigate(-1)
  const fullScreen = useMediaQuery<Theme>(theme => theme.breakpoints.down('sm'))

  return (
    <MuiDialog
      fullWidth
      maxWidth="lg"
      scroll="paper"
      onClose={closeDialog}
      fullScreen={fullScreen}
      open
    >
      <EditDialogTitle mode={mode} handelCancel={closeDialog} />
      <React.Suspense fallback={<Loading />}>
        <EditDialogContent mode={mode} handelCancel={closeDialog} />
      </React.Suspense>
    </MuiDialog>
  )
}

EditDialog.loader = loader
export default EditDialog
