import '@/styles/signin.css';
import Image from "next/image";
import SigninForm from '@/components/SigninForm';


export default function Register() {
  return (
   <>
    <div className="container">
      <div className="signin-container">
        <SigninForm className='form'/>
      </div>
    </div>
   </>
  );
}
