'use server';
import { getDb } from '@/lib/mongo';
import { revalidatePath } from 'next/cache';
import { ObjectId } from 'mongodb';

export async function updateTicket(idTicket: any, estado: string) {
    if (!ObjectId.isValid(idTicket)) {
        throw new Error('ID de ticket inválido');
    }
    const db = await getDb();
    await db.collection('tickets').updateOne(
        { _id: new ObjectId(idTicket) },
        { $set: { estado } }
    );
    revalidatePath('/dashboard/tickets');
}
