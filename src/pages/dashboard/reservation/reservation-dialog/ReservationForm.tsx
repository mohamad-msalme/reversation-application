/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react'
import { useData } from './useData'
import { FormAlert } from 'components/form-alert'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { DeleteDialog } from './delete-reservation-dialog/DeleteDialog'
import { isAxiosError } from 'axios'
import { useNotification } from 'hooks/useNotification'
import { ReservationAction } from './ReservationAction'
import { TextFieldController } from './TextFieldController'
import { DatePickerController } from './DatePickerController'
import { useMutationResevation } from 'services/useMutationReservation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { PropertiesComboboxController } from './PropertiesComboboxController'
import { FormGroup, Theme, useMediaQuery } from '@mui/material'
import { ReservationFormSchema, ReservationFormType } from 'schemas/index'

export const ReservationForm: React.FC<React.PropsWithChildren> = () => {
  const navigate = useNavigate()
  const { reservation } = useData()
  const mutate = useMutationResevation()
  const [open, setOpen] = React.useState(false)
  const [errMsg, setErrMsg] = React.useState('')
  const [Notification, shpwNotification] = useNotification()
  const isMobile = useMediaQuery<Theme>(theme => theme.breakpoints.down('md'))

  const { control, handleSubmit } = useForm<ReservationFormType>({
    resolver: zodResolver(ReservationFormSchema),
    defaultValues: reservation
  })

  const onSubmit: SubmitHandler<ReservationFormType> = async data => {
    try {
      await mutate(data)
      shpwNotification('Reservation has been saved successfully', 'success')
      navigate(-1)
    } catch (error) {
      if (isAxiosError(error) && error.status === 401) {
        throw error
      }
      setErrMsg('Somthing went wrong, please try again')
    }
  }

  return (
    <form
      style={{
        padding: '1rem',
        boxShadow: '0 1px 20px rgba(0, 0, 0, 0.2)',
        borderRadius: '10px'
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      {reservation.reservationId ? (
        <FormGroup sx={{ padding: 2 }}>
          <FormAlert sx={{ flex: 1 }} severity="info">
            {`Reservation updated at: ${new Date(reservation.updatedAt).toDateString()}`}
          </FormAlert>
        </FormGroup>
      ) : null}

      <FormGroup row={!isMobile} sx={{ columnGap: 3, rowGap: 3, padding: 2 }}>
        <TextFieldController
          placeholder="Jonas"
          control={control}
          fieldName="name"
          label="Name"
        />
        <TextFieldController
          placeholder="Jonas@gmail.com"
          control={control}
          fieldName="email"
          label="Email"
        />
      </FormGroup>
      <FormGroup row={!isMobile} sx={{ columnGap: 3, rowGap: 3, padding: 2 }}>
        <DatePickerController
          control={control}
          label="Checkin"
          fieldName="checkin"
        />
        <DatePickerController
          control={control}
          label="Checkout"
          fieldName="checkout"
        />
      </FormGroup>
      <FormGroup row={!isMobile} sx={{ columnGap: 3, rowGap: 3, padding: 2 }}>
        <TextFieldController
          control={control}
          fieldName="propertyName"
          label="Private Property"
          disabled
        />
        <PropertiesComboboxController control={control} />
      </FormGroup>
      {errMsg ? (
        <FormGroup sx={{ padding: 2 }}>
          <FormAlert sx={{ flex: 1 }} severity="error">
            {errMsg}
          </FormAlert>
        </FormGroup>
      ) : null}
      <ReservationAction setOpen={setOpen} control={control} />
      <Notification />
      <DeleteDialog
        open={open}
        setOpen={setOpen}
        showNotification={shpwNotification}
      />
    </form>
  )
}
