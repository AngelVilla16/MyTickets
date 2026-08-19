import '@/styles/login.css';
import Image from "next/image";
import FormLogin from '@/components/FormLogin';


export default function Index() {
  return (
   <>
    <div className="container">
      <div className="login-container">
        <FormLogin className='form'/>
        
      </div>
    </div>
   </>
  );
}
