import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import '@/assets/styles/main.scss'

export const metadata: Metadata = {
  title: 'Employee Dashboard',
  description: 'Admin dashboard built with Next.js 16, Supabase, Drizzle, and Tailwind CSS',
  icons: {
    icon: '/favicon.ico'
  }
}

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  weight: ['400', '500', '700']
})

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${roboto.variable} antialiased min-h-screen`}>
      <body className="bg-white">{children}</body>
    </html>
  )
}
