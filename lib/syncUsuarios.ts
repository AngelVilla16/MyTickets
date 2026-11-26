import { query } from '@/lib/supabaseDb';
import { getDb } from '@/lib/mongo';

export async function syncUsuarios() {
    const usuarios: any = await query('SELECT id_usuario, nombre, apellido, correo, rol, created_at FROM usuarios');
    const db = await getDb();
    const col = db.collection('usuarios');
    for (const u of usuarios) {
        await col.updateOne(
            { id_usuario: u.id_usuario },
            { $set: { id_usuario: u.id_usuario, nombre: u.nombre, apellido: u.apellido, correo: u.correo, rol: u.rol, created_at: u.created_at } },
            { upsert: true }
        );
    }
    return usuarios.length;
}
