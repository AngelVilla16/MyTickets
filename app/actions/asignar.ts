'use server';
import { getDb } from '@/lib/mongo';
import { ObjectId } from 'mongodb';
import { revalidatePath } from 'next/cache';

export async function Asignar(idUsuario: number, idTicket: any) {
    if (!ObjectId.isValid(idTicket)) {
        throw new Error('ID de ticket inválido');
    }
    const db = await getDb();
    await db.collection('tickets').updateOne(
        { _id: new ObjectId(idTicket) },
        { $set: { id_usuario: idUsuario } }
    );
    revalidatePath('/dashboard');
    revalidatePath('/dashboard/tickets');
}
