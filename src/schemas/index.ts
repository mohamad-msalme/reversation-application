import { z } from 'zod'
import { fetchReservationQueryByDate } from 'services/reservationByFilter'

export const SignInSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string'
    })
    .trim()
    .min(1, {
      message: 'Email is required'
    })
    .email({
      message: 'Invalid email address'
    }),
  password: z
    .string()
    .trim()
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
      .trim()
      .min(6, 'Invalid Name Should be greater than 6 char'),
    email: z
      .string({
        required_error: 'Email is required'
      })
      .min(1, {
        message: 'Email is required'
      })
      .trim()
      .email({
        message: 'Invalid email address'
      }),
    password: z
      .string({
        required_error: 'Password is required'
      })
      .trim()
      .min(6, 'Invalid Password Should be greater than 6 char'),
    confirmPassword: z
      .string({
        required_error: 'confirm Password is required'
      })
      .trim()
      .min(6, 'Invalid Password Should be greater than 6 char')
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'Password and confirmed password must be equal',
    path: ['confirmPassword']
  })

export type SignUpFormType = z.infer<typeof SignUpSchema>

export const PropertyFormSchema = z
  .object({
    name: z
      .string({ required_error: 'Please specify a name' })
      .trim()
      .min(1, {
        message: 'Please specify a name'
      })
      .max(255),
    serialNumber: z
      .string({ required_error: 'Please specify a serial Number' })
      .trim()
      .min(1, {
        message: 'Please specify a serial Number'
      })
      .max(255),
    phone: z
      .string({ required_error: 'Please specify a phone Number' })
      .trim()
      .min(1, {
        message: 'Please specify a phone Number'
      })
      .max(255),
    address: z.object({
      country: z
        .string({ required_error: 'Please specify a country' })
        .trim()
        .min(1, {
          message: 'Please specify a country'
        })
        .max(255),
      city: z
        .string({ required_error: 'Please specify a city' })
        .trim()
        .min(1, {
          message: 'Please specify a city'
        })
        .max(255)
    }),
    type: z.string({ required_error: 'Please specify a type' }).min(1, {
      message: 'Please specify a type'
    })
  })
  .strip()

export type PropertyForm = z.infer<typeof PropertyFormSchema>

export const ReservationFormSchema = z
  .object({
    reservationId: z.nullable(z.string()),
    name: z
      .string({ required_error: 'Please specify a name' })
      .trim()
      .min(1, {
        message: 'Name is required '
      })
      .max(255),
    email: z
      .string({
        required_error: 'Email is required'
      })
      .min(1, {
        message: 'Email is required'
      })
      .trim()
      .email({
        message: 'Invalid email address'
      }),
    checkin: z
      .date({
        required_error: 'Please specify checkin date'
      })
      .refine(value => value !== null && value !== undefined, {
        message: 'Checkin date is required',
        path: ['checkin']
      }),
    checkout: z
      .date({
        required_error: 'Please specify checkout date'
      })
      .refine(value => value !== null && value !== undefined, {
        message: 'Checkout date is required',
        path: ['checkout']
      }),
    propertyName: z
      .string()
      .min(1, {
        message: 'Please specify a Private Property'
      })
      .trim(),
    propertyId: z
      .string()
      .min(1, {
        message: 'Please specify a Private Property'
      })
      .trim(),
    publiProperties: z
      .object({
        propertyId: z.string(),
        name: z.string(),
        status: z.string().optional()
      })
      .array()
      .optional()
  })
  .superRefine(async (data, ctx) => {
    // Check if checkout date is after checkin date
    if (data.checkout < data.checkin) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Checkout date must be after checkin date',
        path: ['checkout']
      })
      return z.NEVER
    }

    // Generate an array of months to fetch reservations for
    const dates = []
    const currentDate = new Date(data.checkin)
    while (currentDate <= data.checkout) {
      dates.push({
        year: currentDate.getFullYear(),
        month: currentDate.getMonth()
      })
      currentDate.setMonth(currentDate.getMonth() + 1)
    }

    // Fetch reservations for each month concurrently
    const results = await Promise.all(
      dates.map(({ year, month }) =>
        fetchReservationQueryByDate(data.propertyId, month, year)
      )
    )

    // Flatten and filter reservations for overlapping dates
    const overlappingReservations = results
      .flatMap(v => v)
      .filter(v => (data.reservationId ? v._id !== data.reservationId : true))
      .filter(reservation => {
        // Convert checkin and checkout dates to Date objects
        const currentCheckin = new Date(data.checkin)
        const currentCheckout = new Date(data.checkout)

        // Convert reservation checkin and checkout dates to Date objects
        const reservationCheckin = new Date(reservation.checkin)
        const reservationCheckout = new Date(reservation.checkout)

        // Check for overlap
        return (
          (currentCheckin >= reservationCheckin &&
            currentCheckin < reservationCheckout) ||
          (currentCheckout > reservationCheckin &&
            currentCheckout <= reservationCheckout) ||
          (currentCheckin <= reservationCheckin &&
            currentCheckout >= reservationCheckout)
        )
      })

    if (overlappingReservations.length > 0) {
      // Add overlapping reservations to the list

      // Construct error message
      const errorMessage = `You have ${overlappingReservations.length} reservation(s) with overlapping dates for the same property.`

      // Add error message to context
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: errorMessage,
        path: ['checkin']
      })
      return z.NEVER
    }
  })

export type ReservationFormType = z.infer<typeof ReservationFormSchema>

/**
 * 1- get the start date month and year
 * 2- gett the end date month and year
 *
 */
