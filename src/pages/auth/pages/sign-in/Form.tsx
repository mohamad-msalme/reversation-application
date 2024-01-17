/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react'
import EmailIcon from '@mui/icons-material/Email'

import { z } from 'zod'
import { Coockies } from 'utils/Coockies'
import { useSignin } from 'services/useSignin'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSuccessAuth } from 'services/useSuccessAuth'
import { useVisiblePassword } from '../../hooks/useVisiblePassword'
import { SubmitHandler, useForm } from 'react-hook-form'

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
  const navigate = useNavigate()
  const { mutateAsync } = useSignin()
  const successAuth = useSuccessAuth()
  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<SignInFormType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: Coockies.getUserCradintional()
  })

  const onSubmit: SubmitHandler<SignInFormType> = async ({
    password,
    email,
    rememberMe
  }) => {
    try {
      const result = await mutateAsync({ email, password })
      Coockies.updateUserCradintional(
        rememberMe ? { email, password, rememberMe } : undefined
      )
      successAuth(result)
      reset()
    } catch (error) {
      //
    }
  }
  const { passwordType, endAdornment } = useVisiblePassword()
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup
        sx={theme => ({
          rowGap: theme.spacing(4)
        })}
      >
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
          {...register('email')}
          name="email"
          type="email"
          placeholder="enter email..."
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
        >
          Email
        </TextField>

        <TextField
          {...register('password')}
          name="password"
          placeholder="enter password..."
          variant="filled"
          fullWidth
          label="Password"
          type={passwordType}
          InputProps={{ endAdornment }}
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
        >
          Password
        </TextField>
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

export const SignInSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string'
    })
    .min(1, {
      message: 'Email is required'
    })
    .email({
      message: 'Invalid email address'
    }),
  password: z
    .string()
    .min(1, {
      message: 'Password is required'
    })
    .min(6, 'Invalid Password Should be greater than 6 char'),
  rememberMe: z.boolean()
})

export type SignInFormType = z.infer<typeof SignInSchema>
