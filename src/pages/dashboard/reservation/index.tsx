import React from 'react'
import ApartmentIcon from '@mui/icons-material/Apartment'
import { Property } from 'models/Property'
import { useGetProperties } from 'services/useGetProperties'
import {
  Autocomplete,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  TextField
} from '@mui/material'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
const localizer = momentLocalizer(moment) // or globalizeLocalizer

const Reservation: React.FC = () => {
  const { data } = useGetProperties()

  const [property, setProperty] = React.useState<Property | null>(
    data ? data[0] : null
  )

  return (
    <div
      style={{
        display: 'grid',
        rowGap: '2rem',
        gridTemplateRows: 'max-content 1fr',
        height: '100%',
        gridTemplateColumns: '1fr'
      }}
    >
      <Autocomplete
        disablePortal
        defaultValue={property}
        value={property}
        key={data ? data[0]._id : 0}
        onChange={(e, v) => setProperty(v)}
        getOptionLabel={option => option.name}
        renderOption={(props, option) => (
          <MenuItem {...props}>
            <ListItem>
              <ListItemIcon>
                <ApartmentIcon />
              </ListItemIcon>
              <ListItemText>{option.name}</ListItemText>
            </ListItem>
          </MenuItem>
        )}
        options={(data ?? []) as Readonly<Property[]>}
        sx={{ width: 300, borderRadius: 10 }}
        renderInput={params => <TextField {...params} label="Property" />}
      />
      <Calendar
        views={['month', 'week']}
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  )
}

export default Reservation
