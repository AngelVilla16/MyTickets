import {NextResponse} from 'next/server';
import bcrypt from 'bcryptjs';
import {cookies} from 'next/headers';
import {SignJWT} from 'jose';
import {query} from '@/lib/db';

export async function POST(request:Request){
    try{
        const {correo, nombre, apellido, contrasena, vcontrasena} = await request.json();

        if(!correo || !nombre || !apellido || !contrasena){
            return NextResponse.json({mensaje:"todos los campos son requeridos"}, {status:400});
        }

        if(contrasena.length<8){
            return NextResponse.json({mensaje:"Su contraseña debe tener 8 digitos minimo."}, {status:400});
        }

        if(contrasena !== vcontrasena){
            return NextResponse.json({mensaje:"Las contraseñas no coinciden"}, {status:400});
        }
        const searchQuery = "SELECT correo FROM usuarios WHERE correo = ?";

        const response:any = await query(searchQuery,[correo]);

        if(response.length>0){
            return NextResponse.json({mensaje:"Usuario ya registrado"}, {status:400});
        }

        const hash = await bcrypt.hash(contrasena, 10);

        const insertQuery = "INSERT INTO usuarios(nombre, apellido, correo, contrasena) VALUES(?,?,?,?)";

        const nuevoUsuario = await query(insertQuery,[nombre, apellido, correo, hash]);
        return NextResponse.json({mensaje:"Usuario registrado con exito!"},{status:201});
    }
    catch(error){
        console.error("Error al registrar ", error);
        return NextResponse.json({mensaje:"Error al registrar usuario"},{status:500});
    }
}