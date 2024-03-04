import { isAxiosError } from 'axios'
import { PropertyForm } from 'schemas/index'
import { axiosInstance } from 'client/axiosInstance'
import { PropertyQuery } from './fetchProperty'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const CreatePropertyMutation = () => ({
  mutationKey: ['CreatePropertyMutation'],
  mutationFn: async (payload: PropertyForm) => postProperties(payload)
})

export const UpdatePropertyMutation = () => ({
  mutationKey: ['UpdatePropertyMutation'],
  mutationFn: async (payload: { id: string; data: PropertyForm }) =>
    patchProperties(payload)
})

const handelError = (error: unknown) => {
  let message = 'Somthing went wrong, please try again'
  if (isAxiosError(error) && error.status === 401) throw error
  if (
    isAxiosError<{ errors: [{ message: string }] }>(error) &&
    error.response?.data.errors &&
    error.response?.data.errors.length > 0
  ) {
    message = error.response.data.errors[0].message
  }
  throw Error(message)
}

const postProperties = async (payload: PropertyForm) => {
  try {
    await axiosInstance.post('/properties', payload)
  } catch (error) {
    handelError(error)
  }
}

const patchProperties = async (payload: { id: string; data: PropertyForm }) => {
  try {
    await axiosInstance.patch(`/properties/${payload.id}`, payload.data)
  } catch (error) {
    handelError(error)
  }
}

export const useSaveProperties = (id?: string) => {
  const queryClient = useQueryClient()
  const { mutateAsync: postAsync, ...post } = useMutation(
    CreatePropertyMutation()
  )
  const { mutateAsync: patchAsync, ...patch } = useMutation(
    UpdatePropertyMutation()
  )

  const save = async (payload: PropertyForm) => {
    if (id) {
      await patchAsync({ id, data: payload }, {})
      await queryClient.invalidateQueries({
        queryKey: PropertyQuery(id).queryKey
      })
    } else {
      await postAsync(payload)
    }
    await queryClient.invalidateQueries({
      queryKey: ['PropertiesQuery']
    })
  }

  return {
    mutateAsync: save,
    ...(id ? patch : post)
  }
}
