import { PropertyForm } from 'pages/dashboard/property/components/PropertyFormSchema'
import { axiosInstance } from 'client/axiosInstance'
import { useMutation, useQueryClient } from 'react-query'

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
    //
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
