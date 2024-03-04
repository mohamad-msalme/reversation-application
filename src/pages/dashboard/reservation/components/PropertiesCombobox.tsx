import React from 'react'
import ApartmentIcon from '@mui/icons-material/Apartment'

import { Property } from 'models/Property'
import { useSearchParams } from 'react-router-dom'
import { useReservationsData } from '../useReservationsData'
import {
  Autocomplete,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  TextField
} from '@mui/material'

export const PropertiesCombobox: React.FC = () => {
  const { properties, propertyId } = useReservationsData()
  const [searchParams, setSearchParams] = useSearchParams()
  const value = properties.find(property => property._id === propertyId)
  const hanelOnChange = (
    e: React.SyntheticEvent<Element, Event>,
    v: Property | undefined
  ) => {
    if (v) {
      searchParams.set('propertyId', v._id)
      setSearchParams(searchParams)
    }
  }
  return (
    <Autocomplete
      disableClearable
      disablePortal
      value={value}
      onChange={hanelOnChange}
      getOptionLabel={option => option.name}
      renderOption={(props, option) => (
        <MenuItem {...props} key={option._id}>
          <ListItem>
            <ListItemIcon>
              <ApartmentIcon />
            </ListItemIcon>
            <ListItemText>{option.name}</ListItemText>
          </ListItem>
        </MenuItem>
      )}
      options={properties}
      sx={() => ({
        maxWidth: 300,
        minWidth: 200,
        borderRadius: 10
      })}
      renderInput={params => <TextField {...params} label="Property" />}
    />
  )
}
