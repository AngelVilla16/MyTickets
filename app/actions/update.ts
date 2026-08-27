"use server";
import {query} from '@/lib/db';
import {revalidatePath} from "next/cache";

export async function updateTicket(idTicket:number, estado:string){
    await query('UPDATE tickets SET estado = ? WHERE id_ticket = ?', [estado, idTicket]);
    revalidatePath('/dashboard/tickets');
}