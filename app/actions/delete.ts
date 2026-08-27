"use server";

import {query} from '@/lib/db';
import {revalidatePath} from "next/cache";

export async function deleteTicket(idTicket:number){
    await query('DELETE FROM tickets WHERE id_ticket = ?', [idTicket]);
    revalidatePath('/dashboard/tickets');
}
