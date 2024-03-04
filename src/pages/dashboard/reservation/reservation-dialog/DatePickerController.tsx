import React from 'react'
import moment from 'moment'
import { DatePicker } from '@mui/x-date-pickers'
import { Control, Controller } from 'react-hook-form'
import { ReservationFormType } from 'schemas/index'
type DatePickerComponentProps = {
  fieldName: keyof ReservationFormType
  label: string
  control: Control<ReservationFormType>
}

export const DatePickerController: React.FC<DatePickerComponentProps> = ({
  fieldName,
  label,
  control
}) => (
  <Controller
    control={control}
    name={fieldName}
    render={({
      field: { onChange, ref, value, ...rest },
      fieldState: { error }
    }) => (
      <DatePicker
        {...rest}
        onChange={date => onChange(date?.toDate())}
        onAccept={date => {
          onChange(date?.toDate())
          rest.onBlur()
        }}
        value={value instanceof Date ? moment(value) : undefined}
        inputRef={ref}
        label={label}
        sx={{ flex: 1 }}
        slotProps={{
          textField: {
            required: true,
            error: Boolean(error),
            helperText: error?.message
          },
          actionBar: {
            actions: ['clear']
          }
        }}
      />
    )}
  />
)
