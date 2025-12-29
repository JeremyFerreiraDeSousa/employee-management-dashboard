import React, { useState } from 'react'
import InputErrorMsg from '@/components/Generic/Form/InputErrorMsg'
import { FieldError, UseFormRegisterReturn } from 'react-hook-form'

interface InputProps {
  type: string
  placeholder: string
  autoComplete?: string
  children?: React.ReactNode
  register: UseFormRegisterReturn
  error?: FieldError
}

const ShowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M12.005 15.154q1.524 0 2.586-1.067t1.063-2.591t-1.067-2.587t-2.591-1.063t-2.587 1.067t-1.063 2.592t1.067 2.586t2.592 1.063M12 14.2q-1.125 0-1.912-.787T9.3 11.5t.788-1.912T12 8.8t1.913.788t.787 1.912t-.787 1.913T12 14.2m0 3.8q-2.966 0-5.44-1.57t-3.996-4.114q-.125-.207-.178-.407t-.053-.41t.053-.41t.178-.405Q4.087 8.14 6.56 6.57T12 5t5.44 1.57t3.997 4.115q.125.205.178.405t.052.411t-.052.41t-.178.405q-1.523 2.545-3.997 4.115T12 18m0-1q2.825 0 5.188-1.487T20.8 11.5q-1.25-2.525-3.613-4.012T12 6T6.813 7.488T3.2 11.5q1.25 2.525 3.613 4.013T12 17"
    />
  </svg>
)

const HideIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="m15.446 12.646l-.796-.796q.225-1.31-.742-2.267T11.65 8.85l-.796-.796q.252-.104.526-.156t.62-.052q1.529 0 2.591 1.063t1.063 2.591q0 .346-.052.64q-.052.293-.156.506m3.162 3.073l-.758-.669q.95-.725 1.688-1.588T20.8 11.5q-1.25-2.525-3.588-4.012T12 6q-.725 0-1.425.1T9.2 6.4l-.78-.78q.87-.33 1.772-.475T12 5q3.256 0 5.956 1.79q2.7 1.789 3.967 4.71q-.536 1.206-1.358 2.266t-1.957 1.953m1.115 5.42l-3.892-3.881q-.664.294-1.647.518Q13.2 18 12 18q-3.275 0-5.956-1.79q-2.68-1.789-3.967-4.71q.583-1.325 1.537-2.482q.953-1.157 2.036-1.941l-2.789-2.8l.708-.708l16.862 16.862zM6.358 7.785q-.86.611-1.758 1.607q-.898.997-1.4 2.108q1.25 2.525 3.587 4.013T12 17q.865 0 1.744-.168t1.322-.34l-1.632-1.642q-.236.133-.659.218t-.775.086q-1.529 0-2.591-1.063T8.346 11.5q0-.333.086-.746t.218-.688zm4.354 4.354"
    />
  </svg>
)

export default function Input({
  type,
  placeholder,
  autoComplete,
  children,
  register,
  error
}: InputProps) {
  const [showPass, setShowPass] = useState(false)
  const isPassword = type === 'password'

  return (
    <div className="flex-col gap-2 w-full">
      <div className="group flex items-center bg-white h-12 overflow-hidden relative">
        {children && (
          <label
            htmlFor={register.name}
            className={`absolute top-1/2 -translate-y-1/2 left-4 text-gray-400 group-hover:text-blue-500 group-focus-within:text-blue-500 transition-colors duration-300${error ? ' text-red-500' : ''}`}
          >
            {children}
          </label>
        )}
        <input
          type={isPassword && showPass ? 'text' : type}
          id={register.name}
          placeholder={placeholder}
          className="bg-transparent text-gray-600 placeholder-gray-400 text-sm outline-none w-full h-full pl-12 rounded-xl border border-gray-300/60 hover:border-blue-500 focus:border-blue-500 focus:placeholder-gray-400 transition-colors duration-300"
          autoComplete={autoComplete}
          {...register}
        />

        {isPassword && (
          <div
            className="absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer text-gray-400"
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? <ShowIcon /> : <HideIcon />}
          </div>
        )}
      </div>

      {error && error.message && <InputErrorMsg message={error.message} />}
    </div>
  )
}
