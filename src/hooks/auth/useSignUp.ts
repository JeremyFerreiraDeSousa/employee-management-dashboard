'use client'

import { useRef, useState } from 'react'
import type { LoginFormValues } from '@/schema/auth/auth.schema'
import { signUpService } from '@/services/auth/auth.service'

export function useSignUp() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const abortRef = useRef<AbortController | null>(null)

  const signUp = async (values: LoginFormValues) => {
    abortRef.current?.abort()
    abortRef.current = new AbortController()

    setIsLoading(true)
    setError(null)

    try {
      const { user } = await signUpService(values.email, values.password)

      if (user) setSuccess(true)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unknown error')
    } finally {
      setIsLoading(false)
    }
  }

  return {
    signUp,
    isLoading,
    success,
    error
  }
}
