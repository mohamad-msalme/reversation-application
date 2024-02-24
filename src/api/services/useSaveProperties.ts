import { PropertyForm } from 'pages/dashboard/property/components/PropertyFormSchema'
import { isAxiosError } from 'axios'
import { axiosInstance } from 'client/axiosInstance'
import { PropertyQuery } from './fetchProperty'
import { PropertiesQuery } from './fetchProperties'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const postProperties = async (payload: PropertyForm) => {
  try {
    await axiosInstance.post('/properties', payload)
  } catch (error) {
    let message = 'Somthing went wrong, please try again'
    if (
      isAxiosError<{ errors: [{ message: string }] }>(error) &&
      error.response?.data.errors &&
      error.response?.data.errors.length > 0
    ) {
      message = error.response.data.errors[0].message
    }
    throw Error(message)
  }
}

export const patchProperties = async (payload: {
  id: string
  data: PropertyForm
}) => {
  try {
    await axiosInstance.patch(`/properties/${payload.id}`, payload.data)
  } catch (error) {
    let message = 'Somthing went wrong, please try again'
    if (
      isAxiosError<{ errors: [{ message: string }] }>(error) &&
      error.response?.data.errors &&
      error.response?.data.errors.length > 0
    ) {
      message = error.response.data.errors[0].message
    }
    throw Error(message)
  }
}

export const useSaveProperties = (id?: string) => {
  const queryClient = useQueryClient()
  const { mutateAsync: postAsync, ...post } = useMutation({
    mutationKey: ['postProperties'],
    mutationFn: postProperties
  })
  const { mutateAsync: patchAsync, ...patch } = useMutation({
    mutationKey: ['patchProperties'],
    mutationFn: patchProperties
  })

  const save = async (payload: PropertyForm) => {
    if (id) {
      await patchAsync({ id, data: payload }, {})
      await queryClient.invalidateQueries({
        queryKey: PropertyQuery(id).queryKey
      })
      await queryClient.invalidateQueries({
        queryKey: PropertiesQuery().queryKey
      })
    } else {
      await postAsync(payload)
      await queryClient.invalidateQueries({
        queryKey: PropertiesQuery().queryKey
      })
    }
  }

  return {
    mutateAsync: save,
    ...(id ? patch : post)
  }
}
