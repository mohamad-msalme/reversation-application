import React from 'react'
import ApartmentIcon from '@mui/icons-material/Apartment'

import { PropertyForm } from 'schemas/index'
import { Control, Controller } from 'react-hook-form'
import {
  Autocomplete,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  TextField
} from '@mui/material'

type AutoCompleteController = {
  control: Control<PropertyForm>
}

const options = ['public', 'private']
export const AutoCompleteController: React.FC<AutoCompleteController> = ({
  control
}) => (
  <Controller
    control={control}
    name="type"
    render={({ field: { onChange, ...field }, fieldState: { error } }) => (
      <Autocomplete
        disablePortal
        options={options}
        getOptionLabel={option => option}
        sx={{ flexBasis: '32%' }}
        {...field}
        onChange={(e, value) => onChange(value)}
        renderOption={(props, option) => (
          <MenuItem {...props}>
            <ListItem>
              <ListItemIcon>
                <ApartmentIcon />
              </ListItemIcon>
              <ListItemText>{option}</ListItemText>
            </ListItem>
          </MenuItem>
        )}
        renderInput={params => (
          <TextField
            error={Boolean(error)}
            helperText={error?.message}
            required
            {...params}
            label="Type"
          />
        )}
      />
    )}
  />
)
