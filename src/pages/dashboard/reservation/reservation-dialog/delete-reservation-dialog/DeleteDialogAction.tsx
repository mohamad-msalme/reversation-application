import React from 'react'
import CloseIcon from '@mui/icons-material/Close'

import { Delete } from '@mui/icons-material'
import { Button, DialogActions } from '@mui/material'

type DeleteDialogActionProps = {
  isPending: boolean
  handelDelete: () => Promise<void>
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export const DeleteDialogAction: React.FC<DeleteDialogActionProps> = ({
  isPending,
  handelDelete,
  setOpen
}) => {
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
        onClick={() => setOpen(false)}
      >
        Cancel
      </Button>
    </DialogActions>
  )
}
