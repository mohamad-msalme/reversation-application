import React from 'react'
import SaveIcon from '@mui/icons-material/Save'

import { useParams } from 'react-router-dom'
import { Delete, Add } from '@mui/icons-material'
import { Button, DialogActions } from '@mui/material'
import { ReservationFormType } from 'schemas/index'
import { Control, useFormState } from 'react-hook-form'

type ReservationActionProps = {
  control: Control<ReservationFormType>
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export const ReservationAction: React.FC<ReservationActionProps> = ({
  control,
  setOpen
}) => {
  const { id } = useParams()
  const { isSubmitting } = useFormState({ control })

  const isNew = !id
  const btnLabel = isNew ? 'Create' : 'Save'
  return (
    <DialogActions
      sx={{
        columnGap: 2,
        justifyContent: 'center',
        padding: 0,
        marginTop: 3
      }}
    >
      <Button
        disabled={isSubmitting}
        type="submit"
        variant="contained"
        id={btnLabel}
        name={btnLabel}
        color={isNew ? 'primary' : 'success'}
        startIcon={isNew ? <Add /> : <SaveIcon />}
      >
        {btnLabel}
      </Button>
      {isNew ? null : (
        <Button
          variant="contained"
          name="delete"
          color="error"
          startIcon={<Delete />}
          onClick={() => setOpen(true)}
        >
          Delete
        </Button>
      )}
    </DialogActions>
  )
}
