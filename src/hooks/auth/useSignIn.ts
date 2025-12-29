'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { LoginFormValues } from '@/schema/auth/auth.schema'
import { signInService } from '@/services/auth/auth.service'
import { useAuthStore } from '@/store/auth/useAuthStore'

export function useSignIn() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const abortRef = useRef<AbortController | null>(null)
  const { dispatch } = useAuthStore()
  const router = useRouter()

  const signIn = async (values: LoginFormValues) => {
    abortRef.current?.abort()
    abortRef.current = new AbortController()

    setIsLoading(true)
    setError(null)

    try {
      const data = await signInService(values.email, values.password)

      dispatch({
        type: 'SIGN_IN',
        payload: { email: data.user.email! }
      })
      router.push('/dashboard')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unknown error')
    } finally {
      setIsLoading(false)
    }
  }

  return {
    signIn,
    isLoading,
    error
  }
}
