import React from 'react'
import CloseIcon from '@mui/icons-material/Close'

import { TMode } from './EditDialog'
import { DialogTitle, IconButton } from '@mui/material'

type EditDialogTitleProps = {
  mode: TMode
  handelCancel: () => void
}
export const EditDialogTitle: React.FC<EditDialogTitleProps> = ({
  mode,
  handelCancel
}) => (
  <>
    <DialogTitle>{`${mode} property`}</DialogTitle>
    <IconButton
      aria-label="close"
      onClick={handelCancel}
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
