"use server";

import {query} from '@/lib/db';

import {revalidatePath} from "next/cache";


export async function CreateTicket(titulo:string, descripcion:string, detalle:string, tipo:string, estado:string){
    await query('INSERT INTO tickets(titulo, asunto, descripcion, tipo, estado) VALUES(?,?,?,?,?)', [titulo, descripcion, detalle, tipo, estado]);
    revalidatePath('/dashboard/tickets');
}