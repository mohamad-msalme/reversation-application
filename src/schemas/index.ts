import { z } from 'zod'

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

export const SignUpSchema = z
  .object({
    name: z
      .string({
        required_error: 'Name is required'
      })
      .min(1)
      .min(6, 'Invalid Name Should be greater than 6 char'),
    email: z
      .string({
        required_error: 'Email is required'
      })
      .min(1, {
        message: 'Email is required'
      })
      .email({
        message: 'Invalid email address'
      }),
    password: z
      .string({
        required_error: 'Password is required'
      })
      .min(1)
      .min(6, 'Invalid Password Should be greater than 6 char'),
    confirmPassword: z
      .string({
        required_error: 'confirm Password is required'
      })
      .min(1)
      .min(6, 'Invalid Password Should be greater than 6 char')
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'Password and confirmed password must be equal',
    path: ['confirmPassword']
  })

export type SignUpFormType = z.infer<typeof SignUpSchema>
