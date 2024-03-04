import React from 'react'
import { useDate } from './useData'
import { FormAlert } from 'components/form-alert'
import {
  DialogContent,
  DialogContentText,
  FormGroup,
  TextField
} from '@mui/material'

type DeleteDialogContentProps = {
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}

export const DeleteDialogContent: React.FC<DeleteDialogContentProps> = ({
  setValue,
  value
}) => {
  const data = useDate()
  return (
    <DialogContent>
      <DialogContentText sx={{ marginBottom: 1 }}>
        <FormAlert severity="error">
          {`All reservations for ${data?.name} property will be deleted`}
        </FormAlert>
      </DialogContentText>
      <DialogContentText>
        <FormAlert severity="info">
          {`Please write property name to delete it`}
        </FormAlert>
      </DialogContentText>
      <FormGroup sx={{ marginTop: 1 }}>
        <TextField
          value={value}
          onChange={e => setValue(e.currentTarget.value)}
          label="propertyName"
          placeholder="Enter Property Name"
        />
      </FormGroup>
    </DialogContent>
  )
}
