'use client'

import CtaBtn from '@/components/Generic/Cta/CtaBtn'
import { useAuth } from '@/hooks/auth/useAuth'
import { signOutService } from '@/services/auth/auth.service'

export default function Dashboard() {
  const { email } = useAuth()

  const logout = async () => {
    try {
      await signOutService()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 mx-auto max-w-lg mt-6">
      {email && <div className="text-center">Your email for this account: {email}</div>}
      <CtaBtn type="button" onClick={logout} className="w-40">
        logout
      </CtaBtn>
    </div>
  )
}
