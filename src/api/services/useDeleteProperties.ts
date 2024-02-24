/* eslint-disable no-unused-vars */
import { useNavigate } from 'react-router-dom'
import { isAxiosError } from 'axios'
import { axiosInstance } from 'client/axiosInstance'
import { PropertiesQuery } from './fetchProperties'
import { Property, SuccessPropertyResponse } from 'models/Property'
import {
  QueryObserverResult,
  UseMutationOptions,
  useMutation,
  useQuery
} from '@tanstack/react-query'

type DeleteError = {
  message: string
  propertyId: string
}

interface PromiseRejectedResult {
  status: 'rejected'
  reason: DeleteError
}

type UpdateGridFunction = () => Promise<
  QueryObserverResult<Property[] | undefined, unknown>
>

type DeleteCallback = (
  promiseRejected: number,
  updateGrid: UpdateGridFunction,
  errMsg?: string
) => void

const postDeleteProperties = async (id: string) => {
  try {
    const data = await axiosInstance.delete<SuccessPropertyResponse>(
      `/properties/${id}`
    )
    return data.data.success.property
  } catch (error) {
    const _error: DeleteError = {
      message: 'Somthing went wrong, please try again',
      propertyId: id
    }
    if (
      isAxiosError<{ errors: [{ message: string }] }>(error) &&
      error.response?.data.errors &&
      error.response?.data.errors.length > 0
    ) {
      _error.message = error.response.data.errors[0].message
    }
    throw Error(JSON.stringify(_error))
  }
}

export const useDeleteProperties = (
  options?: UseMutationOptions<Property, unknown, string, unknown>
) => {
  const navigate = useNavigate()
  const { refetch, data } = useQuery({ enabled: false, ...PropertiesQuery() })
  const { mutateAsync, ...rest } = useMutation({
    mutationFn: postDeleteProperties,
    mutationKey: ['useDeleteProperties'],
    ...options
  })

  const refreshTable = async () => await refetch()

  const handelErrors = (errors: PromiseRejectedResult[]) => {
    if (!errors.length) return undefined
    const errorIds: string[] = []
    const errMsg = errors
      .map(error => {
        try {
          const propertyError = JSON.parse(error.reason.message) as DeleteError
          const propertyId = propertyError.propertyId
          errorIds.push(propertyId)
          const propertyFounded = data?.find(item => item._id === propertyId)
          return propertyFounded?.name as string
        } catch (error) {
          return ''
        }
      })
      .join(', ')
    navigate(`/property/delete/${errorIds.join('_')}`, {
      replace: true
    })
    return errMsg
  }

  const deleteProperties = async (ids: string[], callback?: DeleteCallback) => {
    const results = await Promise.allSettled(ids.map(id => mutateAsync(id)))
    const errors = results.filter(
      result => result.status === 'rejected'
    ) as PromiseRejectedResult[]

    callback?.(errors.length, refreshTable, handelErrors(errors))
  }

  return {
    mutateAsync: deleteProperties,
    ...rest
  }
}
