import React from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { DialogTitle, IconButton } from '@mui/material'

type DeleteDialogTitleProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const DeleteDialogTitle: React.FC<DeleteDialogTitleProps> = ({
  setOpen
}) => (
  <>
    <DialogTitle>Delete Reservation</DialogTitle>
    <IconButton
      aria-label="close"
      onClick={() => setOpen(false)}
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
