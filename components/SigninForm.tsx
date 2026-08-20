"use client";
import '@/styles/SigninForm.css';
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

export default function signinLogin({action, className}:formProps){
    const [mensaje, setMensaje] = useState<string>("");
    const [nombre, setNombre] = useState<string>("");
    const [apellido, setApellido] = useState<string>("");
    const [correo, setCorreo] = useState<string>("");
    const [contrasena, setCont] = useState<string>("");
    const [vcontrasena, setVcont] = useState<string>("");
    const router = useRouter();

    const handleRegister = async (e:React.FormEvent)=>{
        e.preventDefault();
        setMensaje("");
       try{
            const res = await fetch('/api/auth/register',{
                method:"POST",
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({nombre, apellido, correo, contrasena, vcontrasena})
            });
            const data = await res.json();

            if(!res.ok){
                setMensaje(data.mensaje);
                return;
         }
         router.push('/');
       }
       catch(error){
        setMensaje("Problema con el servidor");
       }
        
    }

    return(
        <>
            <form className={className} onSubmit={handleRegister}>
                <Label text='Nombre:' className='signinlabel' />
                <Input className='signininput' type='text' placeholder='Juan' onChange={(e)=>setNombre(e.target.value)} />
                <Label text='Apellido' className='signinlabel' />
                <Input type='text' className='signininput' placeholder='Perez' onChange={(e)=>setApellido(e.target.value)} />
                <Label text='Correo:' className='signinlabel'/>
                <Input className='signininput' type='email' placeholder='@gmail.com' onChange={(e)=>setCorreo(e.target.value)} />
                <Label text='Contraseña:' className='signinlabel' />
                <Input className='signininput' type='password' placeholder='*******' onChange={(e)=>setCont(e.target.value)} />
                <Label text="Confirmar contraseña: " className='signinlabel'/>
                <Input className='signininput' type='password' placeholder='*******' onChange={(e)=>setVcont(e.target.value)} />
                {mensaje && <Label className='aviso' text={mensaje} />}
                <Button type='submit' className='btnSig' textBtn='Registrar'/>
                <Link href="/" className='link'> Iniciar Sesión Aqui</Link>
            </form>
        </>
    );
}