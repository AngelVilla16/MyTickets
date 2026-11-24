import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { query } from '@/lib/supabaseDb';

export async function POST(request: Request) {
    try {
        const { correo, nombre, apellido, contrasena, vcontrasena, role } = await request.json();

        if (!correo || !nombre || !apellido || !contrasena || !vcontrasena || !role) {
            return NextResponse.json({ mensaje: "todos los campos son requeridos" }, { status: 400 });
        }

        if (contrasena.length < 8) {
            return NextResponse.json({ mensaje: "Su contraseña debe tener 8 digitos minimo." }, { status: 400 });
        }

        if (contrasena !== vcontrasena) {
            return NextResponse.json({ mensaje: "Las contraseñas no coinciden" }, { status: 400 });
        }

        const existente: any = await query("SELECT correo FROM usuarios WHERE correo = $1", [correo]);
        if (existente.length > 0) {
            return NextResponse.json({ mensaje: "Usuario ya registrado" }, { status: 400 });
        }

        const hash = await bcrypt.hash(contrasena, 10);

        const rows: any = await query(
            "INSERT INTO usuarios(nombre, apellido, correo, contrasena, rol) VALUES($1,$2,$3,$4,$5) RETURNING id_usuario, nombre, apellido, correo, rol",
            [nombre, apellido, correo, hash, role]
        );

        return NextResponse.json({ mensaje: "Usuario registrado con exito!", usuario: rows[0] }, { status: 201 });
    } catch (error: any) {
        console.error("Error al registrar ", error);
        if (error.code === '23505') {
            return NextResponse.json({ mensaje: "Usuario ya registrado" }, { status: 400 });
        }
        return NextResponse.json({ mensaje: "Error al registrar usuario" }, { status: 500 });
    }
}
