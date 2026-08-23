'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function logout() {
    const cookieStore = await cookies();
    
    // Eliminamos la cookie de la sesión
    cookieStore.delete('ticket_session');

    // Redirigimos al usuario a la página de login
    redirect('/');
}