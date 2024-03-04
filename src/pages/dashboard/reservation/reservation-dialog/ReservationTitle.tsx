import React from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { useParams, useNavigate } from 'react-router-dom'
import { DialogTitle, IconButton } from '@mui/material'

export const ReservationTitle: React.FC = () => {
  const { id } = useParams()
  const isNew = !id

  const navigate = useNavigate()
  const close = () => navigate(-1)

  const title = `${isNew ? 'Create' : 'Modify'} reservation`

  return (
    <>
      <DialogTitle>{title}</DialogTitle>
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
    </>
  )
}
