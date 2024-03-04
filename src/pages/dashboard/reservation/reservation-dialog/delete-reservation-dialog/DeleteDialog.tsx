import React from 'react'

import { isAxiosError } from 'axios'
import { DeleteDialogTitle } from './DeleteDialogTitle'
import { AlertProps, Dialog } from '@mui/material'
import { DeleteDialogAction } from './DeleteDialogAction'
import { DeleteDialogContent } from './DeleteDialogContent'
import { useNavigate, useParams } from 'react-router-dom'
import { DeleteReservationMutation } from 'services/useMutationReservation'
import { useMutation, useQueryClient } from '@tanstack/react-query'

type DeleteDialogProps = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  showNotification: (msg: string, severity: AlertProps['severity']) => void
}

export const DeleteDialog: React.FC<DeleteDialogProps> = ({
  open,
  setOpen,
  showNotification
}) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [errMsg, setErrorMsg] = React.useState('')
  const { mutateAsync, isPending } = useMutation({
    ...DeleteReservationMutation()
  })

  const handelDelete = async () => {
    const invalidateQueryKeys = [
      'ReservationByIdQuery',
      'ReservationsByTypeQuery',
      'ReservationQueryByFilter',
      'ReservationByPropertyIdQuery'
    ]
    try {
      if (!id) return
      await mutateAsync(id)
      await Promise.all(
        invalidateQueryKeys.map(queryKey =>
          queryClient.invalidateQueries({
            queryKey: [queryKey]
          })
        )
      )
      showNotification('Reservation has been deleted Successfully', 'success')
      navigate(-1)
    } catch (error) {
      if (isAxiosError(error) && error.status === 401) throw error
      setErrorMsg('Somthing wend wrong please try again')
      console.log(error)
    }
  }
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DeleteDialogTitle setOpen={setOpen} />
      <DeleteDialogContent errorMsg={errMsg} />
      <DeleteDialogAction
        setOpen={setOpen}
        handelDelete={handelDelete}
        isPending={isPending}
      />
    </Dialog>
  )
}
