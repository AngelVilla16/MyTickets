import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { SignJWT } from 'jose';
import { query } from '@/lib/supabaseDb';
import { syncUsuarios } from '@/lib/syncUsuarios';

export async function POST(request: Request) {
    try {
        const { correo, contrasena } = await request.json();
        if (!correo || !contrasena) {
            return NextResponse.json({ mensaje: "Todos los campos son obligatorios" }, { status: 400 });
        }

        const rows: any = await query(
            "SELECT id_usuario, correo, nombre, apellido, contrasena, rol FROM usuarios WHERE correo = $1",
            [correo]
        );

        if (rows.length === 0) {
            return NextResponse.json({ mensaje: "Correo o contraseña incorrectos." }, { status: 400 });
        }
        const usuario = rows[0];

        const verifyContrasena = await bcrypt.compare(contrasena, usuario.contrasena);
        if (!verifyContrasena) {
            return NextResponse.json({ mensaje: "Correo o contraseña incorrectos." }, { status: 400 });
        }

        // Sincronizar usuarios de Postgres a Mongo al iniciar sesión
        try {
            await syncUsuarios();
        } catch (e) {
            console.error('Error sincronizando usuarios:', e);
        }

        const payload = {
            id: usuario.id_usuario,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            correo: usuario.correo,
            role: usuario.rol
        };

        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const token = await new SignJWT(payload)
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('2h')
            .sign(secret);

        const cookieStore = await cookies();
        cookieStore.set('ticket_session', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 2,
            path: '/'
        });

        return NextResponse.json({ mensaje: "Bienvenido ", usuario: payload }, { status: 200 });
    } catch (error) {
        console.error("Error al iniciar sesion: ", error);
        return NextResponse.json({ mensaje: "Error al iniciar sesion" }, { status: 500 });
    }
}
