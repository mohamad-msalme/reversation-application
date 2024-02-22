import { axiosInstance } from 'client/axiosInstance'
import { useGetProperties } from './useGetProperties'
import { isAxiosError, AxiosResponse } from 'axios'
import { UseMutationOptions, useMutation } from 'react-query'

const postDeleteProperties = async (id: string) => {
  try {
    const data = await axiosInstance.delete(`/properties/${id}`)
    return data
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

export const useDeleteProperties = (
  options?: UseMutationOptions<
    AxiosResponse<unknown, unknown> | undefined,
    unknown,
    string,
    unknown
  >
) => {
  const { refetch } = useGetProperties({ enabled: false })
  const { mutateAsync, ...rest } = useMutation(
    'useDeleteProperties',
    postDeleteProperties,
    options
  )

  const deleteProperties = async (ids: string[], callback?: () => void) => {
    const results = await Promise.allSettled(ids.map(id => mutateAsync(id)))
    const errors = results.filter(result => result.status === 'rejected')

    if (errors.length > 0) {
      console.error('Errors occurred during property deletion:', errors)
    }

    if (ids.length !== errors.length) {
      await refetch()
      callback?.()
    }
  }

  return {
    mutateAsync: deleteProperties,
    ...rest
  }
}
