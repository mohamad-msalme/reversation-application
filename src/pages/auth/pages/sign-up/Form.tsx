/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react'
import EmailIcon from '@mui/icons-material/Email'
import PersonIcon from '@mui/icons-material/Person'

import { FormAlert } from 'components/form-alert'
import { useMutation } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSuccessAuth } from 'hooks/useSuccessAuth'
import { signupMutation } from 'services/signup'
import { useVisiblePassword } from '../../hooks/useVisiblePassword'
import { SignUpFormType, SignUpSchema } from 'schemas/index'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Button, FormGroup, InputAdornment, TextField } from '@mui/material'

export const Form: React.FC = () => {
  const [errMsg, setErroMsg] = React.useState('')
  const { passwordType, endAdornment } = useVisiblePassword()
  const {
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting }
  } = useForm<SignUpFormType>({
    resolver: zodResolver(SignUpSchema)
  })
  const successAuth = useSuccessAuth()
  const { mutateAsync } = useMutation(signupMutation())
  const onSubmit: SubmitHandler<SignUpFormType> = async ({
    email,
    password
  }) => {
    try {
      setErroMsg('')
      const user = await mutateAsync({ email, password })
      reset()
      successAuth(user)
    } catch (error) {
      const _error = error as { message: string }
      setErroMsg(_error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup
        sx={theme => ({
          rowGap: theme.spacing(4)
        })}
      >
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                )
              }}
              variant="filled"
              fullWidth
              label="Name"
              type="text"
              placeholder="Enter name..."
              {...field}
              error={Boolean(fieldState.error?.message)}
              helperText={fieldState.error?.message ?? ''}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                )
              }}
              variant="filled"
              fullWidth
              label="Email"
              type="email"
              placeholder="Enter email..."
              {...field}
              error={Boolean(fieldState.error?.message)}
              helperText={fieldState.error?.message ?? ''}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              placeholder="Enter password..."
              variant="filled"
              fullWidth
              label="Password"
              type={passwordType}
              {...field}
              InputProps={{ endAdornment }}
              error={Boolean(fieldState.error?.message)}
              helperText={fieldState.error?.message ?? ''}
            />
          )}
        />
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              placeholder="Confirm Password..."
              variant="filled"
              fullWidth
              label="Confirm Password"
              type={passwordType}
              InputProps={{ endAdornment }}
              {...field}
              error={Boolean(fieldState.error?.message)}
              helperText={fieldState.error?.message ?? ''}
            />
          )}
        />
        <FormAlert severity="error">{errMsg}</FormAlert>
        <Button
          disabled={isSubmitting}
          type="submit"
          fullWidth
          variant="contained"
          size="large"
        >
          Sign Up
        </Button>
      </FormGroup>
    </form>
  )
}
