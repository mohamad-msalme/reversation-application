/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react'
import SaveIcon from '@mui/icons-material/Save'
import CloseIcon from '@mui/icons-material/Close'

import { TMode } from './EditDialog'
import { zodResolver } from '@hookform/resolvers/zod'
import { useGetProperty } from 'services/useGetProperty'
import { useSaveProperties } from 'services/useSaveProperties'
import { TextFieldController } from './TextFieldController'
import { SubmitHandler, useForm } from 'react-hook-form'
import { PropertyForm, PropertyFormSchema } from './PropertyFormSchema'
import {
  Button,
  DialogActions,
  DialogContent,
  FormGroup,
  Theme,
  useMediaQuery
} from '@mui/material'

export const EditDialogContent: React.FC<React.PropsWithChildren<TForm>> = ({
  mode,
  id,
  handelCancel
}) => {
  const enabled = Boolean(id)
  const disabled = mode === 'View'

  const { data } = useGetProperty(id || '', {
    enabled,
    suspense: true
  })

  const isMobile = useMediaQuery<Theme>(theme => theme.breakpoints.down('sm'))

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting }
  } = useForm<PropertyForm>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: zodResolver(PropertyFormSchema),
    defaultValues: data || {}
  })
  const { mutateAsync } = useSaveProperties(id)
  const onSubmit: SubmitHandler<PropertyForm> = async data => {
    try {
      console.log(data)
      await mutateAsync(data)
      reset()
      handelCancel()
    } catch (error) {
      //
    }
  }

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
        <FormGroup sx={{ rowGap: 3, flexWrap: isMobile ? 'wrap' : 'nowrap' }}>
          <TextFieldController
            control={control}
            disabled={disabled}
            fieldName="name"
            label="Name"
          />

          <FormGroup
            sx={{
              rowGap: 2,
              columnGap: 2,
              flexWrap: isMobile ? 'wrap' : 'nowrap'
            }}
            row
          >
            <TextFieldController
              control={control}
              disabled={disabled}
              fieldName="serialNumber"
              label="serial number"
            />
            <TextFieldController
              control={control}
              disabled={disabled}
              fieldName="phone"
              label="phone"
            />
          </FormGroup>
          <FormGroup
            sx={{
              rowGap: 2,
              columnGap: 2,
              flexWrap: isMobile ? 'wrap' : 'nowrap'
            }}
            row
          >
            <TextFieldController
              control={control}
              disabled={disabled}
              fieldName="address.country"
              label="Country"
            />
            <TextFieldController
              control={control}
              disabled={disabled}
              fieldName="address.city"
              label="City"
            />
          </FormGroup>
          <DialogActions
            sx={{ columnGap: 2, justifyContent: 'center', padding: 0 }}
          >
            {['Edit', 'New'].includes(mode) ? (
              <Button
                type="submit"
                variant="contained"
                name="save"
                color="success"
                startIcon={<SaveIcon />}
                disabled={isSubmitting}
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
        </FormGroup>
      </form>
    </DialogContent>
  )
}

type TForm = {
  mode: TMode
  id?: string
  handelCancel: () => void
}
