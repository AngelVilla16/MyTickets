import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

export interface Session {
    id: number;
    nombre: string;
    apellido: string;
    correo: string;
    role: string;
}

// Correos con permiso de "jefe" (separados por coma en la variable JEFES_EMAILS).
const JEFES_EMAILS = (process.env.JEFES_EMAILS ?? '')
    .split(',')
    .map((correo) => correo.trim().toLowerCase())
    .filter(Boolean);

// Recupera el payload del JWT de la sesión, o null si no hay token válido.
export async function getSession(): Promise<Session | null> {
    const token = (await cookies()).get('ticket_session')?.value;
    if (!token) return null;

    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET || '');
        const { payload } = await jwtVerify(token, secret);
        return payload as unknown as Session;
    } catch {
        return null;
    }
}

// ¿El correo pertenece a un jefe? (compara sin importar mayúsculas/espacios)
export function esJefe(correo?: string | null): boolean {
    if (!correo) return false;
    return JEFES_EMAILS.includes(correo.trim().toLowerCase());
}

// Verificación obligatoria para Server Actions sensibles: lanza si no es jefe.
export async function requireJefe(): Promise<Session> {
    const user = await getSession();
    if (!user || !esJefe(user.correo)) {
        throw new Error('No autorizado: solo el jefe puede realizar esta acción.');
    }
    return user;
}
