import React from 'react'
import { TextField } from '@mui/material'
import { PropertyForm } from './PropertyFormSchema'
import { Control, Controller } from 'react-hook-form'

type TTextFieldController = {
  fieldName: keyof PropertyForm | 'address.country' | 'address.city'
  label: string
  disabled: boolean
  control: Control<PropertyForm>
}
export const TextFieldController: React.FC<TTextFieldController> = ({
  fieldName,
  label,
  disabled,
  control
}) => {
  return (
    <Controller
      name={fieldName}
      control={control}
      disabled={disabled}
      render={({ field: { ref, ...field }, fieldState: { error } }) => (
        <TextField
          sx={{
            flex: 1
          }}
          label={label}
          required
          error={Boolean(error)}
          helperText={error?.message}
          inputRef={ref}
          {...field}
        />
      )}
    />
  )
}
