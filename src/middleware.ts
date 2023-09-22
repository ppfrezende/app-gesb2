import { NextResponse } from 'next/server'

export function middleware(req) {
  const cookie = req.cookies.get('gesb.token')?.value

  if (!cookie) {
    const url = req.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url, req.url)
  }
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/main-employees/:path*',
    '/main-management/:path*',
    '/management/:path*',
    '/me/:path*',
    '/users/:path*',
    '/workers/:path*',
  ],
}
