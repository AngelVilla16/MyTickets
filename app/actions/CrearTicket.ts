'use server';

import { getDb } from '@/lib/mongo';
import { revalidatePath } from 'next/cache';

export async function CreateTicket(titulo: string, descripcion: string, detalle: string, tipo: string, estado: string) {
    const db = await getDb();
    await db.collection('tickets').insertOne({
        id_usuario: null,
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
