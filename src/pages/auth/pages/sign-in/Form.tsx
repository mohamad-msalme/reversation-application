/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react'
import EmailIcon from '@mui/icons-material/Email'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
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
import { useNavigate } from 'react-router-dom'

export const Form: React.FC = () => {
  const navigate = useNavigate()
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm<SignInFormType>({
    resolver: zodResolver(SignInSchema)
  })

  const onSubmit: SubmitHandler<SignInFormType> = data => {
    console.log(data)
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
          type="email"
          placeholder="enter email..."
          {...register('email')}
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
        >
          Email
        </TextField>

        <TextField
          placeholder="enter password..."
          variant="filled"
          fullWidth
          label="Password"
          type={passwordType}
          InputProps={{ endAdornment }}
          {...register('password')}
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
            control={<Checkbox color="primary" {...register('rememberMe')} />}
            label="Remember me"
          />
          <Link onClick={() => navigate('/forgetpassword')}>
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
