import React from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { DialogTitle, IconButton } from '@mui/material'

type DeleteDialogTitleProps = {
  close: () => void
}

export const DeleteDialogTitle: React.FC<DeleteDialogTitleProps> = ({
  close
}) => (
  <>
    <DialogTitle>Delete Property</DialogTitle>
    <IconButton
      aria-label="close"
      onClick={() => close()}
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
