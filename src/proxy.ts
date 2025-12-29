import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'

export async function proxy(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = await supabaseServer(req.cookies)

  const {
    data: { session }
  } = await supabase.auth.getSession()

  const pathname = req.nextUrl.pathname
  const isDashboard = pathname.startsWith('/dashboard')
  const authPages = ['/auth/sign-in', '/auth/sign-up']

  if (isDashboard && !session) {
    return NextResponse.redirect(new URL('/auth/sign-in', req.url))
  }

  if (authPages.includes(pathname) && session) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return res
}
