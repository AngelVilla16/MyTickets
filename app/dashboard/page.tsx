import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

async function getSession() {
    const cookieStore = await cookies();
    const token = cookieStore.get('ticket_session')?.value;

    if (!token) return null;

    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(token, secret);
        return payload; // Contiene id, nombre, apellido, correo y rol
    } catch (error) {
        return null;
    }
}
export default async function Dashboard(){
    const user:any = await getSession();
    return(
        <>
        <h1>Hola, {user.nombre}</h1>
        </>
    );
}