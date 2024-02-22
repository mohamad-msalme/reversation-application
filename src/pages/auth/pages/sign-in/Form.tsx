/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react'
import EmailIcon from '@mui/icons-material/Email'

import { Coockies } from 'utils/Coockies'
import { FormAlert } from '../FormAlert'
import { useSignin } from 'services/useSignin'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSuccessAuth } from 'services/useSuccessAuth'
import { useVisiblePassword } from '../../hooks/useVisiblePassword'
import { SignInFormType, SignInSchema } from 'schemas/index'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  InputAdornment,
  Link,
  TextField
} from '@mui/material'

export const Form: React.FC = () => {
  const [errMsg, setErroMsg] = React.useState('')
  const navigate = useNavigate()
  const { mutateAsync } = useSignin()
  const successAuth = useSuccessAuth()
  const { passwordType, endAdornment } = useVisiblePassword()
  const {
    control,
    handleSubmit,
    register,
    reset,
    watch,
    formState: { isSubmitting }
  } = useForm<SignInFormType>({
    resolver: zodResolver(SignInSchema)
  })

  const onSubmit: SubmitHandler<SignInFormType> = async ({
    rememberMe,
    ...rest
  }) => {
    try {
      const result = await mutateAsync(rest)
      if (rememberMe) Coockies.updateUserCradintional({ ...rest, rememberMe })
      setErroMsg('')
      successAuth(result)
      reset()
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
          name="email"
          control={control}
          render={({ field, fieldState: { error } }) => (
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
              {...field}
              type="email"
              placeholder="json@gmail.com"
              error={Boolean(error?.message)}
              helperText={error?.message ?? ''}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              InputProps={{ endAdornment }}
              placeholder="123456"
              variant="filled"
              fullWidth
              label="Password"
              type={passwordType}
              {...field}
              error={Boolean(error?.message)}
              helperText={error?.message ?? ''}
            />
          )}
        />

        <FormGroup
          row
          sx={{
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <FormControlLabel
            label="Remember me"
            control={
              <Checkbox
                color="primary"
                {...register('rememberMe')}
                checked={watch('rememberMe')}
              />
            }
          />
          <Link
            onClick={() => navigate('/forgetpassword', { state: 'signIn' })}
          >
            Forget password?
          </Link>
        </FormGroup>
        <FormAlert severity="error">{errMsg}</FormAlert>
        <Button
          disabled={isSubmitting}
          type="submit"
          fullWidth
          variant="contained"
          size="large"
        >
          Sign in
        </Button>
      </FormGroup>
    </form>
  )
}
