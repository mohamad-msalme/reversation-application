import React from 'react'
import ApartmentIcon from '@mui/icons-material/Apartment'
import { Loading } from './Loading'
import { Property } from 'models/Property'
import { useQuery } from '@tanstack/react-query'
import { PropertiesQuery } from 'services/fetchProperties'
import {
  Autocomplete,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  TextField
} from '@mui/material'

const CalendarComponent = React.lazy(() => import('./CalendarComponent'))

const Reservation: React.FC = () => {
  const { data } = useQuery(PropertiesQuery())

  const [property, setProperty] = React.useState<Property | null>(
    data ? data[0] : null
  )

  return (
    <div
      style={{
        position: 'relative',
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
      <React.Suspense fallback={<Loading />}>
        <CalendarComponent />
      </React.Suspense>
    </div>
  )
}

export default Reservation
