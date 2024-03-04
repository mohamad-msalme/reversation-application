import React from 'react'
import SaveIcon from '@mui/icons-material/Save'
import CloseIcon from '@mui/icons-material/Close'

import { TMode } from './EditDialog'
import { PropertyForm } from 'schemas/index'
import { Control, useFormState } from 'react-hook-form'
import { Button, DialogActions } from '@mui/material'

type EditDialogActionProps = {
  mode: TMode
  handelCancel: () => void
  control: Control<PropertyForm>
}
export const EditDialogAction: React.FC<EditDialogActionProps> = ({
  mode,
  control,
  handelCancel
}) => {
  const { isSubmitting, disabled } = useFormState<PropertyForm>({ control })
  return (
    <DialogActions
      sx={{
        columnGap: 2,
        justifyContent: 'center',
        padding: 0,
        marginTop: 3
      }}
    >
      {['Edit', 'New'].includes(mode) ? (
        <Button
          type="submit"
          variant="contained"
          name="save"
          color="success"
          startIcon={<SaveIcon />}
          disabled={disabled || isSubmitting}
        >
          Save
        </Button>
      ) : null}

      <Button
        variant="contained"
        name="cancel"
        startIcon={<CloseIcon />}
        onClick={handelCancel}
      >
        Cancel
      </Button>
    </DialogActions>
  )
}
