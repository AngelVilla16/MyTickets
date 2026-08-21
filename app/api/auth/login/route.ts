import {NextResponse} from 'next/server';
import bcrypt from 'bcryptjs';
import {cookies} from 'next/headers';
import {SignJWT} from 'jose';
import {query} from '@/lib/db';
export async function POST(request:Request){
    try{
        const {correo, contrasena} = await request.json();
        if (!correo || !contrasena) {
            return NextResponse.json({ mensaje: "Todos los campos son obligatorios" }, { status: 400 });
        }

        const selectQuery = "SELECT id_usuario, correo, nombre, apellido, contrasena, rol FROM usuarios WHERE correo = ?";
        const response:any = await query(selectQuery,[correo]);

        if(response.length===0){
            return NextResponse.json({mensaje:"Correo o contraseña incorrectos."}, {status:400});
        }
        const usuario = response[0];
        //validar la contraseña

        const verifyContrasena = await bcrypt.compare(contrasena, usuario.contrasena);

        if(!verifyContrasena){
            return NextResponse.json({mensaje:"Correo o contraseña incorrectos."}, {status:400});

        }

        const payload = {
            id: usuario.id_usuario,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            correo: usuario.correo,
            role: usuario.rol
        }

        const secret = new TextEncoder().encode(process.env.JWT_SECRET);

        const token = await new SignJWT(payload)
            .setProtectedHeader({alg: 'HS256'})
            .setIssuedAt()
            .setExpirationTime('2h')
            .sign(secret)

        //Guardar cookie
        const cookieStore = await cookies();
        cookieStore.set('ticket_session', token,{
            httpOnly:true,
            secure:process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 2,
            path:'/'
        });

        return NextResponse.json({mensaje: "Bienvenido ", usuario:payload}, {status:200});
        
    }
    catch(error){
        console.error("Error al iniciar sesión: ", error);
        return NextResponse.json({mensaje:"Error al iniciar sesión"}, {status:500});
    }
}