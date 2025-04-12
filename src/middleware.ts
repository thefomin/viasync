import { NextRequest, NextResponse } from 'next/server'

export default function middleware(request: NextRequest) {
	const { url, cookies } = request

	const session = cookies.get('session')?.value
	const isAuthPage = url.includes('/auth')

	if (isAuthPage && session) {
		return NextResponse.redirect(new URL('/', url))
	}

	if (!isAuthPage && !session) {
		return NextResponse.redirect(new URL('/auth/sign-in', url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/((?!_next|api|auth|preview).*)']
}
