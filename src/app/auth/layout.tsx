'use client'

import React from 'react'
import Image from 'next/image'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:min-h-screen w-full">
        <div className="hidden lg:inline-flex items-center justify-center bg-blue-500">
          <Image
            src="/images/authentication/auth-bg.webp"
            alt="Auth image"
            width={375}
            height={356}
            className="h-auto object-contain mx-auto"
            priority
          />
        </div>
        <div className="flex flex-col items-center justify-center mt-12 lg:mt-0">{children}</div>
      </div>
    </main>
  )
}
