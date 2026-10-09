"use server";
import { query } from '@/lib/db';
import { revalidatePath } from "next/cache";
import { requireJefe } from '@/lib/auth';

export async function Asignar(idUsuario: number, idTicket: number) {
    // Solo el jefe puede asignar tickets (verificación en el servidor).
    await requireJefe();

    await query('UPDATE tickets SET id_usuario = ? WHERE id_ticket = ?', [idUsuario, idTicket]);
    revalidatePath('/dashboard');
}
