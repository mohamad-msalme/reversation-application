/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react'
import EmailIcon from '@mui/icons-material/Email'
import PersonIcon from '@mui/icons-material/Person'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useVisiblePassword } from '../../hooks/useVisiblePassword'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, FormGroup, InputAdornment, TextField } from '@mui/material'
import { axiosInstance } from 'client/axiosInstance'

const qwe = async (email: string, password: string) => {
  try {
    const data = await axiosInstance.post('/auth/signup', {
      email,
      password
    })
    console.log(data)
    return data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const Form: React.FC = () => {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors, isSubmitting }
  } = useForm<SignUpFormType>({
    resolver: zodResolver(SignUpSchema)
  })

  const onSubmit: SubmitHandler<SignUpFormType> = async data => {
    try {
      const result = await qwe(data.email, data.password)
      console.log(result)
      reset()
    } catch (error) {
      console.log(error)
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
                <PersonIcon />
              </InputAdornment>
            )
          }}
          variant="filled"
          fullWidth
          label="Name"
          type="text"
          placeholder="Enter name..."
          {...register('name')}
          error={Boolean(errors.name)}
          helperText={errors.name?.message}
        />

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
          {...register('email')}
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
        />

        <TextField
          placeholder="Enter password..."
          variant="filled"
          fullWidth
          label="Password"
          type={passwordType}
          InputProps={{ endAdornment }}
          {...register('password')}
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
        />

        <TextField
          placeholder="Confirm Password..."
          variant="filled"
          fullWidth
          label="Confirm Password"
          type={passwordType}
          InputProps={{ endAdornment }}
          {...register('confirmPassword')}
          error={Boolean(errors.confirmPassword)}
          helperText={errors.confirmPassword?.message}
        />

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

export const SignUpSchema = z
  .object({
    name: z
      .string()
      .min(1, {
        message: 'Name is required'
      })
      .min(6, 'Invalid Name Should be greater than 6 char'),
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
    confirmPassword: z
      .string()
      .min(1, {
        message: 'Password is required'
      })
      .min(6, 'Invalid Password Should be greater than 6 char')
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'Password and confirmed password must be equal',
    path: ['password', 'confirmPassword']
  })

export type SignUpFormType = z.infer<typeof SignUpSchema>
