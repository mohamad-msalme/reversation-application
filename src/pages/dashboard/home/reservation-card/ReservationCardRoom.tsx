import React from 'react'
import ApartmentIcon from '@mui/icons-material/Apartment'

import { Box } from '@mui/material'
import { isAxiosError } from 'axios'
import { useNotification } from 'hooks/useNotification'
import { useReservationCard } from './ReservationCardContext'
import { PropertyStatusMutation } from 'services/lockProperty'
import { ReservationsByTypeQuery } from 'services/reservationByFilter'
import { ReservationCardLockAction } from './ReservationCardLockAction'
import { ReservationCardUnLockAction } from './ReservationCardUnLockAction'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const ReservationCardRoom: React.FC = () => {
  const queryClient = useQueryClient()
  const { reservation, type } = useReservationCard()
  const [Notificatio, showNotification] = useNotification()
  const [propertyId, setPropertyId] = React.useState<string | undefined>(
    undefined
  )
  const [reservationId, setReservationId] = React.useState<string | undefined>(
    undefined
  )
  const { mutateAsync, isPending } = useMutation(PropertyStatusMutation())

  const handelClick = async (
    status: string,
    propertyId: string,
    propertyName: string
  ) => {
    setPropertyId(propertyId)
    setReservationId(reservation?._id)
    const reservationId = reservation?._id
    if (!reservationId) throw Error('ReservationId not specify')
    try {
      await mutateAsync({
        propertyId,
        type,
        reservationId,
        status
      })
      await queryClient.invalidateQueries({
        queryKey: ReservationsByTypeQuery(type).queryKey
      })
      showNotification(
        `${propertyName} has been ${status} Successfully`,
        'success'
      )
    } catch (error) {
      if (isAxiosError(error) && error.status === 401) throw error
      showNotification(
        `${propertyName} has Not been ${status} Successfully`,
        'error'
      )
    } finally {
      setReservationId(undefined)
    }
  }
  return (
    <Box display="flex" rowGap={1} columnGap={1} flexDirection="column">
      <Box display="flex" gap={1} alignItems="center">
        <ApartmentIcon color="info" />
        <b>Properties: </b>
      </Box>
      <Box display="flex" gap={1} flexDirection="column">
        {reservation?.properties.map(property => (
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            key={property.propertyId}
          >
            <Box display="flex" gap={1} alignItems="center">
              <ApartmentIcon color="info" />
              <b>{property.name}</b>
            </Box>
            {property.status === 'lock' ? (
              <ReservationCardUnLockAction
                onClick={() =>
                  void handelClick('unlock', property.propertyId, property.name)
                }
                disabled={
                  propertyId === property.propertyId &&
                  reservation._id === reservationId &&
                  isPending
                }
              />
            ) : (
              <ReservationCardLockAction
                onClick={() =>
                  void handelClick('lock', property.propertyId, property.name)
                }
                disabled={
                  propertyId === property.propertyId &&
                  reservation._id === reservationId &&
                  isPending
                }
              />
            )}
          </Box>
        ))}
      </Box>
      <Notificatio />
    </Box>
  )
}
