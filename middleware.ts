import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('ticket_session')?.value;
    const { pathname } = request.nextUrl;
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || '');

    // 1. Protección de rutas privadas (/dashboard y subrutas)
    if (pathname.startsWith('/dashboard')) {
        if (!token) {
            return NextResponse.redirect(new URL('/', request.url));
        }

        try {
            await jwtVerify(token, secret);
            return NextResponse.next();
        } catch (error) {
            // Token inválido o expirado -> redirigir y borrar cookie
            const response = NextResponse.redirect(new URL('/', request.url));
            response.cookies.delete('ticket_session');
            return response;
        }
    }

    // 2. Redirección de usuarios ya autenticados fuera de Login/Registro
    if ((pathname === '/' || pathname === '/register') && token) {
        try {
            await jwtVerify(token, secret);
            // Corregido: agregado request.url como segundo parámetro
            return NextResponse.redirect(new URL('/dashboard', request.url));
        } catch (error) {
            // Si el token ya no es válido, borramos la cookie limpia
            const response = NextResponse.next();
            response.cookies.delete('ticket_session');
            return response;
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/', '/register'],
};