/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { TMode } from './EditDialog'
import { useQuery } from '@tanstack/react-query'
import { PropertyForm } from './PropertyFormSchema'
import { LocationQuery } from 'services/fetchLocation'
import { LatLngExpression } from 'leaflet'
import { UseFormSetValue, UseFormWatch } from 'react-hook-form'
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents
} from 'react-leaflet'

const MapEvents: React.FC<Omit<TMapProperty, 'watch'>> = ({
  id,
  setValue,
  mode
}) => {
  const map = useMapEvents({
    click: e => {
      if (mode === 'View') return
      setValue('address.country', e.latlng.lng.toString())
      setValue('address.city', e.latlng.lat.toString())
    }
  })

  React.useEffect(() => {
    if (id) return
    window.navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords
        setValue('address.city', latitude.toString())
        setValue('address.country', longitude.toString())
        map.flyTo([latitude, longitude], 10)
      },
      _error => {
        setValue('address.city', '51.505')
        setValue('address.country', '-0.09')
        map.flyTo([51.505, -0.09], 10)
      }
    )
  }, [])

  return null
}

export type TMapProperty = {
  id?: string
  setValue: UseFormSetValue<PropertyForm>
  watch: UseFormWatch<PropertyForm>
  mode: TMode
}

const MapProperty: React.FC<TMapProperty> = ({ id, setValue, watch, mode }) => {
  const value = watch('address')
  const coords: LatLngExpression = value
    ? [Number(value.city), Number(value.country)]
    : [51.505, -0.09]

  const { data } = useQuery(
    LocationQuery({
      lng: coords[1],
      lat: coords[0]
    })
  )

  return (
    <MapContainer
      style={{
        minHeight: '35vh'
      }}
      center={coords}
      zoom={13}
      scrollWheelZoom
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={coords}>
        <Popup>{data}</Popup>
      </Marker>
      <MapEvents mode={mode} setValue={setValue} id={id} />
    </MapContainer>
  )
}
export default MapProperty
