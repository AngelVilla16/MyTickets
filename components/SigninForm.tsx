import '@/styles/SigninForm.css';
import Label from '@/components/ui/Label';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Link from 'next/link';
interface formProps{
    action?:string,
    className?:string
}

export default function signinLogin({action, className}:formProps){
    return(
        <>
            <form className={className}>
                <Label text='Correo:' className='signinlabel'/>
                <Input className='signininput' type='email' placeholder='@gmail.com'/>
                <Label text='Contraseña:' className='signinlabel' />
                <Input className='signininput' type='password' placeholder='*******'/>
                <Label text="Confirmar contraseña: " className='signinlabel'/>
                <Input className='signininput' type='password' placeholder='*******'/>

                <Button type='submit' className='btnSig' textBtn='Registrar'/>
                <Link href="/" className='link'> Iniciar Sesión Aqui</Link>
            </form>
        </>
    );
}