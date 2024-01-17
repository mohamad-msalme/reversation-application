import { useMutation } from 'react-query'
import { axiosInstance } from 'client/axiosInstance'
import { useGetProperties } from './useGetProperties'
import { PropertyForm } from 'pages/dashboard/property/components/PropertyFormSchema'

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
  const { refetch } = useGetProperties({ enabled: false })
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
      await patchAsync({ id, data: payload }, { onSuccess: () => refetch() })
    } else {
      await postAsync(payload, { onSuccess: () => refetch() })
    }
  }

  return {
    mutateAsync: save,
    ...(id ? patch : post)
  }
}
