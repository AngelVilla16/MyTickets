"use server";
import {query} from '@/lib/db';
import {revalidatePath} from "next/cache";

export async function Asignar(idUsuario:number, idTicket:number){
    await query('UPDATE tickets SET id_usuario = ? WHERE id_ticket = ?', [idUsuario, idTicket]);
    revalidatePath('/dashboard');
}





















































