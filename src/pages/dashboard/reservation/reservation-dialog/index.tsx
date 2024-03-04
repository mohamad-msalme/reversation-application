import React from 'react'

import { loader } from './loader'
import { useNavigate } from 'react-router-dom'
import { ReservationForm } from './ReservationForm'
import { ReservationTitle } from './ReservationTitle'
import { AdapterMomentProvider } from './AdapterMomentProvider'
import { Dialog, DialogContent, Theme, useMediaQuery } from '@mui/material'

export const ReservationDialog = () => {
  const navigate = useNavigate()
  const close = () => navigate(-1)
  const fullScreen = useMediaQuery<Theme>(theme => theme.breakpoints.down('sm'))

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      scroll="paper"
      onClose={close}
      fullScreen={fullScreen}
      open
    >
      <ReservationTitle />
      <DialogContent>
        <AdapterMomentProvider>
          <ReservationForm />
        </AdapterMomentProvider>
      </DialogContent>
    </Dialog>
  )
}

ReservationDialog.loader = loader
