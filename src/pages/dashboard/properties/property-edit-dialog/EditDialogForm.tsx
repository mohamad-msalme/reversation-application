/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react'
import { TMode } from './EditDialog'
import { useQuery } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { PropertyQuery } from 'services/fetchProperty'
import { EditDialogAction } from './EditDialogAction'
import { useSaveProperties } from 'services/useSaveProperties'
import { TextFieldController } from './TextFieldController'
import { PropertyOutletContext } from '..'
import { SubmitHandler, useForm } from 'react-hook-form'
import { PropertyLoaderResponse } from './loader'
import { AutoCompleteController } from './AutoCompleteController'
import { FormGroup, Theme, useMediaQuery } from '@mui/material'
import { PropertyForm, PropertyFormSchema } from 'schemas/index'
import { useLoaderData, useOutletContext, useParams } from 'react-router-dom'

const MapProperty = React.lazy(() => import('./MapProperty'))

type EditDialogForm = {
  mode: TMode
  handelCancel: () => void
}

export const EditDialogForm: React.FC<EditDialogForm> = ({
  mode,
  handelCancel
}) => {
  const { id } = useParams()
  const { mutateAsync } = useSaveProperties(id)

  const { showNotification } = useOutletContext<PropertyOutletContext>()
  const isMobile = useMediaQuery<Theme>(theme => theme.breakpoints.down('md'))

  const { success, initialData } = useLoaderData() as PropertyLoaderResponse

  const { data } = useQuery({
    ...PropertyQuery(id ?? ''),
    enabled: !!id,
    initialData
  })

  const { handleSubmit, control, setValue, reset, watch } =
    useForm<PropertyForm>({
      mode: 'onBlur',
      reValidateMode: 'onBlur',
      resolver: zodResolver(PropertyFormSchema),
      defaultValues: data,
      disabled: !success || mode === 'View'
    })

  const onSubmit: SubmitHandler<PropertyForm> = async data => {
    try {
      await mutateAsync(data)
      showNotification('Success', 'success')
      reset()
      handelCancel()
    } catch (error) {
      const _error = error as { message: string }
      showNotification(_error.message, 'error')
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
      <FormGroup row={!isMobile} sx={{ columnGap: 3, rowGap: 3, padding: 2 }}>
        <TextFieldController control={control} fieldName="name" label="Name" />
        <TextFieldController
          control={control}
          fieldName="serialNumber"
          label="serial number"
        />
        <TextFieldController
          control={control}
          fieldName="phone"
          label="phone"
        />
      </FormGroup>
      <FormGroup
        row={!isMobile}
        sx={{ columnGap: 3, rowGap: 3, marginBottom: 3, padding: 2 }}
      >
        <AutoCompleteController control={control} />
      </FormGroup>

      <MapProperty mode={mode} id={id} setValue={setValue} watch={watch} />
      <EditDialogAction
        control={control}
        mode={mode}
        handelCancel={handelCancel}
      />
    </form>
  )
}
