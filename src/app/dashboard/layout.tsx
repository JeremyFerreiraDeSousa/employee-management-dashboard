'use client'

import React, { ReactNode } from 'react'
import { AuthProvider } from '@/providers/auth/AuthProvider'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>
}
