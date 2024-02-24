/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react'
import SaveIcon from '@mui/icons-material/Save'
import CloseIcon from '@mui/icons-material/Close'

import { TMode } from './EditDialog'
import { Property } from 'models/Property'
import { useQuery } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { PropertyQuery } from 'services/fetchProperty'
import { useSaveProperties } from 'services/useSaveProperties'
import { TextFieldController } from './TextFieldController'
import { PropertyOutletContext } from '..'
import { SubmitHandler, useForm } from 'react-hook-form'
import { PropertyForm, PropertyFormSchema } from './PropertyFormSchema'
import { useLoaderData, useOutletContext, useParams } from 'react-router-dom'
import {
  Button,
  DialogActions,
  DialogContent,
  FormGroup,
  Theme,
  useMediaQuery
} from '@mui/material'

const MapProperty = React.lazy(() => import('./MapProperty'))

export const EditDialogContent: React.FC<React.PropsWithChildren<TForm>> = ({
  mode,
  handelCancel
}) => {
  const { id } = useParams()
  const enabled = Boolean(id)
  const { showNotification } = useOutletContext<PropertyOutletContext>()
  const isMobile = useMediaQuery<Theme>(theme => theme.breakpoints.down('md'))
  const { success, initialData } = useLoaderData() as {
    success: boolean
    initialData: Property
  }

  const successRef = React.useRef(success)

  const { data } = useQuery({
    ...PropertyQuery(id ?? ''),
    enabled,
    initialData
  })

  const {
    handleSubmit,
    control,
    setValue,
    reset,
    watch,
    formState: { isSubmitting }
  } = useForm<PropertyForm>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: zodResolver(PropertyFormSchema),
    defaultValues: data ?? {},
    disabled: !success || mode === 'View'
  })
  const { mutateAsync } = useSaveProperties(id)

  const onSubmit: SubmitHandler<PropertyForm> = async data => {
    try {
      await mutateAsync(data)
      showNotification('Success', 'success')
      reset()
      handelCancel()
    } catch (error) {
      const _error = error as { message: string }
      showNotification(_error.message, 'error')
      //
    }
  }

  React.useEffect(() => {
    if (!successRef.current) {
      showNotification('Somthing went wrong, please try again', 'error')
    }
  }, [])

  return (
    <DialogContent>
      <form
        style={{
          padding: '1rem',
          boxShadow: '0 1px 20px rgba(0, 0, 0, 0.2)',
          borderRadius: '10px'
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormGroup
          row={!isMobile}
          sx={{ columnGap: 3, rowGap: 3, marginBottom: 3, padding: 2 }}
        >
          <TextFieldController
            control={control}
            fieldName="name"
            label="Name"
          />
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
        <MapProperty mode={mode} id={id} setValue={setValue} watch={watch} />
        <DialogActions
          sx={{
            columnGap: 2,
            justifyContent: 'center',
            padding: 0,
            marginTop: 3
          }}
        >
          {['Edit', 'New'].includes(mode) ? (
            <Button
              type="submit"
              variant="contained"
              name="save"
              color="success"
              startIcon={<SaveIcon />}
              disabled={isSubmitting || !success}
            >
              Save
            </Button>
          ) : null}

          <Button
            variant="contained"
            name="cancel"
            startIcon={<CloseIcon />}
            onClick={handelCancel}
          >
            Cancel
          </Button>
        </DialogActions>
      </form>
    </DialogContent>
  )
}

type TForm = {
  mode: TMode
  handelCancel: () => void
}
