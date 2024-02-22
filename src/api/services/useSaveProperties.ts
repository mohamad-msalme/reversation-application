import { PropertyForm } from 'pages/dashboard/property/components/PropertyFormSchema'
import { axiosInstance } from 'client/axiosInstance'
import { useMutation, useQueryClient } from 'react-query'
import { isAxiosError } from 'axios'

export const postProperties = async (payload: PropertyForm) => {
  try {
    await axiosInstance.post('/properties', payload)
  } catch (error) {
    //
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
  const { mutateAsync: postAsync, ...post } = useMutation(
    'postProperties',
    postProperties
  )
  const { mutateAsync: patchAsync, ...patch } = useMutation(
    'patchProperties',
    patchProperties
  )

  const save = async (payload: PropertyForm) => {
    if (id) {
      await patchAsync(
        { id, data: payload },
        {
          onSuccess: async () => {
            await queryClient.invalidateQueries({
              queryKey: ['useGetProperty', id]
            })
            await queryClient.invalidateQueries({
              queryKey: ['useGetProperties']
            })
          }
        }
      )
    } else {
      await postAsync(payload, {
        onSuccess: async () =>
          await queryClient.invalidateQueries({
            queryKey: ['useGetProperties']
          })
      })
    }
  }

  return {
    mutateAsync: save,
    ...(id ? patch : post)
  }
}