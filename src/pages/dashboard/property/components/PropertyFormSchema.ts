import { z } from 'zod'

export const PropertyFormSchema = z
  .object({
    name: z.string({ required_error: 'Please specify a name' }).min(1).max(255),
    serialNumber: z
      .string({ required_error: 'Please specify a serial Number' })
      .min(1)
      .max(255),
    phone: z
      .string({ required_error: 'Please specify a phone Number' })
      .min(1)
      .max(255),
    address: z.object({
      country: z
        .string({ required_error: 'Please specify a country' })
        .min(1)
        .max(255),
      city: z
        .string({ required_error: 'Please specify a city' })
        .min(1)
        .max(255)
    })
  })
  .strip()

export type PropertyForm = z.infer<typeof PropertyFormSchema>
