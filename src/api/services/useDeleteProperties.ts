/* eslint-disable no-unused-vars */
import { axiosInstance } from 'client/axiosInstance'
import { SuccessPropertyResponse } from 'models/Property'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const DeletePropertyMutation = () => ({
  mutationKey: ['DeletePropertyMutation'],
  mutationFn: async (id?: string) => postDeleteProperties(id)
})

const postDeleteProperties = async (id?: string) => {
  if (!id) throw Error('id does not provided')
  try {
    const data = await axiosInstance.delete<SuccessPropertyResponse>(
      `/properties/${id}`
    )
    return data.data.success.property
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const useDeleteProperties = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    ...DeletePropertyMutation(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['PropertiesQuery'] })
    }
  })

  return mutation
}
