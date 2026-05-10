import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = ['/dashboard'];
const publicRoutes = ['/', '/login'];

export function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;

	const isProtected = protectedRoutes.some((r) => pathname.startsWith(r));
	const isPublic = publicRoutes.includes(pathname);
	const isAuthenticated = request.cookies.has('rt-present');

	if (isProtected && !isAuthenticated) {
		return NextResponse.redirect(new URL('/login', request.url));
	}

	if (isPublic && isAuthenticated) {
		return NextResponse.redirect(new URL('/dashboard/home', request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
