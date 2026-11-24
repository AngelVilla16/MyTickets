'use server';

import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { getDb } from '@/lib/mongo';
import { revalidatePath } from 'next/cache';

async function getSessionId(): Promise<number | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get('ticket_session')?.value;
    if (!token) return null;
    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(token, secret);
        return (payload as any).id ?? null;
    } catch {
        return null;
    }
}

export async function CreateTicket(titulo: string, descripcion: string, detalle: string, tipo: string, estado: string) {
    const idUsuario = await getSessionId();
    const db = await getDb();
    await db.collection('tickets').insertOne({
        id_usuario: idUsuario,
        titulo,
        asunto: descripcion,
        descripcion: detalle,
        tipo,
        estado,
        fecha: new Date(),
    });
    revalidatePath('/dashboard/tickets');
    revalidatePath('/dashboard');
}
