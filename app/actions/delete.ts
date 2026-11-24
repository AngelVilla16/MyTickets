'use server';

import { getDb } from '@/lib/mongo';
import { revalidatePath } from 'next/cache';
import { ObjectId } from 'mongodb';

export async function deleteTicket(idTicket: any) {
    if (!ObjectId.isValid(idTicket)) {
        throw new Error('ID de ticket inválido');
    }
    const db = await getDb();
    await db.collection('tickets').deleteOne({ _id: new ObjectId(idTicket) });
    revalidatePath('/dashboard/tickets');
}
