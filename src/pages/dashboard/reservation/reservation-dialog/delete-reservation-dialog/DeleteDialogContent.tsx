import React from 'react'
import { FormAlert } from 'components/form-alert'
import { Box, DialogContent, DialogContentText } from '@mui/material'

type DeleteDialogContentProps = {
  errorMsg: string
}
export const DeleteDialogContent: React.FC<DeleteDialogContentProps> = ({
  errorMsg
}) => {
  return (
    <DialogContent>
      <DialogContentText>
        Are you sure you want to delete this Reservation?
      </DialogContentText>
      <Box mt="1rem" display="flex" flexDirection="column" rowGap="1rem">
        <FormAlert severity="error">{errorMsg}</FormAlert>
      </Box>
    </DialogContent>
  )
}
