import React from 'react'
import ApartmentIcon from '@mui/icons-material/Apartment'

import { useData } from './useData'
import { Control, Controller } from 'react-hook-form'
import { ReservationFormType } from 'schemas/index'
import {
  Autocomplete,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  TextField
} from '@mui/material'

type PropertiesComboboxControllerProps = {
  control: Control<ReservationFormType>
}
export const PropertiesComboboxController: React.FC<
  PropertiesComboboxControllerProps
> = ({ control }) => {
  const { publicPropties } = useData()
  return (
    <Controller
      control={control}
      name="publiProperties"
      render={({
        field: { onChange, ref, value, ...rest },
        fieldState: { error }
      }) => (
        <Autocomplete
          disablePortal
          ref={ref}
          isOptionEqualToValue={(option, value) =>
            option.propertyId === value.propertyId
          }
          options={publicPropties}
          getOptionLabel={option => option.name}
          sx={{ flex: 1 }}
          {...rest}
          value={value ?? []}
          multiple
          onChange={(e, value) => onChange(value)}
          renderOption={(props, option) => (
            <MenuItem {...props} key={option.propertyId}>
              <ListItem>
                <ListItemIcon>
                  <ApartmentIcon />
                </ListItemIcon>
                <ListItemText>{option.name}</ListItemText>
              </ListItem>
            </MenuItem>
          )}
          renderInput={params => (
            <TextField
              error={Boolean(error)}
              helperText={error?.message}
              {...params}
              label="Public Property"
            />
          )}
        />
      )}
    />
  )
}
