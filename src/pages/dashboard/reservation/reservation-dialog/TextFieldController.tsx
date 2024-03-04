import React from 'react'
import { TextField } from '@mui/material'
import { ReservationFormType } from 'schemas/index'
import { Control, Controller } from 'react-hook-form'

export type TTextFieldController = {
  fieldName: keyof ReservationFormType
  label: string
  disabled?: boolean
  control: Control<ReservationFormType>
  placeholder?: string
}
export const TextFieldController: React.FC<TTextFieldController> = ({
  fieldName,
  label,
  control,
  placeholder,
  disabled
}) => {
  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field: { ref, ...field }, fieldState: { error } }) => (
        <TextField
          sx={{
            flex: 1
          }}
          label={label}
          required
          disabled={disabled}
          placeholder={placeholder}
          error={Boolean(error)}
          helperText={error?.message}
          inputRef={ref}
          {...field}
        />
      )}
    />
  )
}
