import React from 'react'
import { FormAlert } from 'components/form-alert'
import { Box, DialogContent, DialogContentText } from '@mui/material'

type DeleteDialogContentProps = {
  errMsg: string
  successMsg: string
}

export const DeleteDialogContent: React.FC<DeleteDialogContentProps> = ({
  errMsg,
  successMsg
}) => (
  <DialogContent>
    <DialogContentText>
      Are you sure you want to delete this property?
    </DialogContentText>
    <Box mt="1rem" display="flex" flexDirection="column" rowGap="1rem">
      <FormAlert severity="error">{errMsg}</FormAlert>
      <FormAlert severity="success">{successMsg}</FormAlert>
    </Box>
  </DialogContent>
)
