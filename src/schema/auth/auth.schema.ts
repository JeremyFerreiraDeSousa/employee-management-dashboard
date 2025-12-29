import { z } from 'zod'

const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/

export const signInSchema = z.object({
  email: z.email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      passwordRegex,
      'Password must contain at least 1 uppercase letter and 1 special character'
    )
})

export const signUpSchema = signInSchema
  .extend({
    confirmPassword: z.string()
  })
  .refine(data => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords must the same'
  })

export type LoginFormValues = z.infer<typeof signInSchema>
export type RegisterFormValues = z.infer<typeof signUpSchema>
