"use client";
import '@/styles/FormLogin.css';
import Label from '@/components/ui/Label';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Link from 'next/link';

import React, {useState} from 'react';
import {useRouter} from 'next/navigation';


interface formProps{
    action?:string,
    className?:string
}

export default function formLogin({action, className}:formProps){
    const [correo, setCorreo] = useState<string>("");
    const [contrasena, setContrasena] = useState<string>("");
    const [mensaje, setMensaje] = useState<string>("");
    const router = useRouter();
    const handleLogin = async (e:React.FormEvent) =>{
        e.preventDefault();

        const res = await fetch('/api/auth/login',{
            method:"POST",
            headers:{'Content-Type' : 'application/json'},
            body: JSON.stringify({correo, contrasena})
        });

        const data = await res.json();

        if(res.ok){
           
            router.push('/dashboard')
        }
        else{
            setMensaje(data.mensaje);
        }
    };

    return(
        <>
            <form className={className} onSubmit={handleLogin}>
                <Label text='Correo:' className='loglabel'/>
                <Input className='loginput' type='email' placeholder='@gmail.com' onChange={(e)=>setCorreo(e.target.value)}/>
                <Label text='Contraseña:' className='loglabel' />
                <Input className='loginput' type='password' placeholder='*******' onChange={(e)=>setContrasena(e.target.value)} />
                {mensaje && <Label className="aviso" text={mensaje}/>}
                <Button type='submit' className='btnLog' textBtn='Iniciar Sesión'  />
                <Link href="/register" className="link"> ¿No tiene una cuenta? Inicie Sesión aqui</Link>
            </form>
        </>
    );
}