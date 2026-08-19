import '@/styles/FormLogin.css';
import Label from '@/components/ui/Label';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Link from 'next/link';

interface formProps{
    action?:string,
    className?:string
}

export default function formLogin({action, className}:formProps){
    return(
        <>
            <form className={className}>
                <Label text='Correo:' className='loglabel'/>
                <Input className='loginput' type='email' placeholder='@gmail.com'/>
                <Label text='Contraseña:' className='loglabel' />
                <Input className='loginput' type='password' placeholder='*******'/>

                <Button type='submit' className='btnLog' textBtn='Iniciar Sesión'/>
                <Link href="/register" className="link"> ¿No tiene una cuenta? Inicie Sesión aqui</Link>
            </form>
        </>
    );
}