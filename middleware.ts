import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const { nextUrl, auth: session } = req
  const isAdminRoute = nextUrl.pathname.startsWith('/admin')
  const isLoginPage = nextUrl.pathname === '/admin/login'

  if (isAdminRoute && !isLoginPage && !session) {
    return NextResponse.redirect(new URL('/admin/login', nextUrl))
  }

  if (isLoginPage && session) {
    return NextResponse.redirect(new URL('/admin/dashboard', nextUrl))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/admin/:path*'],
}
