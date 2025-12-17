'use client'

import React, { JSX } from 'react'
import Image from 'next/image'
import Input from './Input'
import {
  LoginFormValues,
  loginSchema,
  RegisterFormValues,
  registerSchema
} from '@/schema/authentication/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { FieldErrors, SubmitHandler, useForm } from 'react-hook-form'

type Mode = 'login' | 'register'
type FormValues<M extends Mode> = M extends 'login' ? LoginFormValues : RegisterFormValues

interface AuthFormProps {
  mode: Mode
}

const copyContent = {
  login: {
    title: 'Sign in',
    subtitle: 'Welcome back! Please sign in to continue',
    btn: 'Access to the application',
    schema: loginSchema
  },
  register: {
    title: 'Sign up',
    subtitle: 'Welcome, please create an account to proceed',
    btn: 'Create an account',
    schema: registerSchema
  }
} as const

const EmailIcon = (): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M5 5h13a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3m0 1c-.5 0-.94.17-1.28.47l7.78 5.03l7.78-5.03C18.94 6.17 18.5 6 18 6zm6.5 6.71L3.13 7.28C3.05 7.5 3 7.75 3 8v9a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2V8c0-.25-.05-.5-.13-.72z"
    />
  </svg>
)

const PasswordIcon = (): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M6.616 21q-.672 0-1.144-.472T5 19.385v-8.77q0-.67.472-1.143Q5.944 9 6.616 9H8V7q0-1.671 1.165-2.835Q10.329 3 12 3t2.836 1.165T16 7v2h1.385q.67 0 1.143.472q.472.472.472 1.144v8.769q0 .67-.472 1.143q-.472.472-1.143.472zm0-1h10.769q.269 0 .442-.173t.173-.442v-8.77q0-.269-.173-.442T17.385 10H6.615q-.269 0-.442.173T6 10.616v8.769q0 .269.173.442t.443.173M12 16.5q.633 0 1.066-.434q.434-.433.434-1.066t-.434-1.066T12 13.5t-1.066.434Q10.5 14.367 10.5 15t.434 1.066q.433.434 1.066.434M9 9h6V7q0-1.25-.875-2.125T12 4t-2.125.875T9 7zM6 20V10z"
    />
  </svg>
)

const ConfirmPasswordIcon = (): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M12.003 21q-1.866 0-3.5-.701q-1.632-.701-2.854-1.912t-1.936-2.85T3 12.04h1q0 1.65.635 3.102q.634 1.453 1.722 2.54T8.9 19.398t3.099.628q3.35 0 5.675-2.325T20 12.025T17.675 6.35T12 4.025q-2.436 0-4.365 1.28q-1.927 1.28-2.881 3.349h2.9v1H3V5h1v2.98q1.087-2.228 3.21-3.604T12 3q1.868 0 3.51.709t2.858 1.922t1.923 2.857t.709 3.509t-.708 3.51t-1.924 2.859t-2.856 1.925t-3.509.709M10 15.77q-.376 0-.63-.255t-.254-.63v-3q0-.376.287-.63q.287-.255.712-.255V9.884q0-.777.554-1.33Q11.222 8 12 8t1.331.554t.554 1.33V11q.425 0 .712.254q.288.255.288.63v3q0 .377-.255.631q-.254.254-.63.254zm.885-4.77h2.23V9.892q0-.47-.325-.797T12 8.77t-.79.326t-.326.797z"
    />
  </svg>
)

export default function AuthForm({ mode }: AuthFormProps): JSX.Element {
  const { title, subtitle, btn, schema } = copyContent[mode]
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<FormValues<typeof mode>>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    reValidateMode: 'onChange'
  })

  const emailValue = watch('email')
  const passwordValue = watch('password')
  const confirmPasswordValue = mode === 'register' ? watch('confirmPassword') : undefined

  const onSubmit: SubmitHandler<FormValues<typeof mode>> = data => {
    console.log('Form submitted:', data)
  }

  const confirmPasswordError =
    mode === 'register' ? (errors as FieldErrors<RegisterFormValues>).confirmPassword : undefined

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 lg:min-h-screen w-full">
      <div className="hidden lg:inline-flex items-center justify-center bg-blue-500">
        <Image
          src="/images/authentication/auth-bg.webp"
          alt="Login image"
          width={350}
          height={350}
          className="h-auto object-contain mx-auto"
          priority
        />
      </div>

      <div className="flex flex-col items-center justify-center mt-12 lg:mt-0">
        <h2 className="title text-gray-900">{title}</h2>
        <p className="text-gray-600 mt-3 mb-8">{subtitle}</p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="md:w-96 w-80 flex flex-col items-center justify-center gap-4"
        >
          <Input
            type="email"
            placeholder="Enter your address email"
            autoComplete="email"
            register={register('email')}
            error={errors.email}
            value={emailValue}
          >
            <EmailIcon />
          </Input>
          <Input
            type="password"
            placeholder="Enter your password"
            autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            register={register('password')}
            error={errors.password}
            value={passwordValue}
          >
            <PasswordIcon />
          </Input>

          {mode === 'register' && (
            <Input
              type="password"
              placeholder="Confirm your password"
              autoComplete="confirm-password"
              register={register('confirmPassword')}
              error={confirmPasswordError}
              value={confirmPasswordValue}
            >
              <ConfirmPasswordIcon />
            </Input>
          )}

          <button
            type="submit"
            role="button"
            className="w-full mt-4 h-11 rounded-xl cursor-pointer text-white bg-red-400 border-b-4 border-red-500 hover:bg-red-500 transition-all"
          >
            {btn}
          </button>

          {mode === 'login' && (
            <p className="text-gray-500/90 text-sm flex gap-1">
              Don’t have an account?
              <a className="text-indigo-400 hover:underline" href="/authentication/signup">
                Sign up
              </a>
            </p>
          )}

          {mode === 'register' && (
            <p className="text-gray-500/90 text-sm flex gap-1">
              Already have an account?
              <a className="text-indigo-400 hover:underline" href="/authentication/signin">
                Sign in
              </a>
            </p>
          )}
        </form>
      </div>
    </div>
  )
}
