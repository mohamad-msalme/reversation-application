import { axiosInstance } from 'client/axiosInstance'
import { ReservationFormType } from 'schemas/index'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const DeleteReservationMutation = () => ({
  mutationKey: ['DeleteReservationMutation'],
  mutationFn: async (id: string) => deleteReservation(id)
})

const deleteReservation = async (id: string) => {
  try {
    await axiosInstance.delete(`reservations/${id}`)
  } catch (error) {
    console.log(error)
  }
}

export const CreateReservationMutation = () => ({
  mutationKey: ['CreateReservationMutation'],
  mutationFn: async (data: ReservationFormType) => createReservation(data)
})

const createReservation = async (data: ReservationFormType) => {
  const dataToSave = {
    checkin: data.checkin,
    checkout: data.checkout,
    email: data.email,
    name: data.name,
    properties: [
      { propertyId: data.propertyId, name: data.propertyName },
      ...(data.publiProperties ?? [])
    ]
  }

  try {
    await axiosInstance.post('/reservations', dataToSave)
  } catch (error) {
    console.log({ error })
    throw error
  }
}

export const UpdateReservationMutation = () => ({
  mutationKey: ['UpdateReservationMutation'],
  mutationFn: async (data: ReservationFormType) => updateReservation(data)
})

const updateReservation = async (data: ReservationFormType) => {
  const id = data.reservationId
  const dataToSave = {
    checkin: data.checkin,
    checkout: data.checkout,
    email: data.email,
    name: data.name,
    properties: [
      { propertyId: data.propertyId, name: data.propertyName },
      ...(data.publiProperties ?? [])
    ]
  }

  try {
    await axiosInstance.patch(`/reservations/${id}`, dataToSave)
  } catch (error) {
    console.log({ error })
    throw error
  }
}

export const useMutationResevation = () => {
  const invalidateQueryKeys = [
    'ReservationsByTypeQuery',
    'ReservationByIdQuery',
    'ReservationByPropertyIdQuery',
    'ReservationQueryByFilter'
  ]
  const queryClient = useQueryClient()
  const { mutateAsync: mutateNewReservation } = useMutation(
    CreateReservationMutation()
  )
  const { mutateAsync: mutateReservation } = useMutation(
    UpdateReservationMutation()
  )

  const mutate = async (data: ReservationFormType) => {
    if (data.reservationId) await mutateReservation(data)
    else await mutateNewReservation(data)
    await Promise.all(
      invalidateQueryKeys.map(queryKey =>
        queryClient.invalidateQueries({
          queryKey: [queryKey]
        })
      )
    )
  }

  return mutate
}
