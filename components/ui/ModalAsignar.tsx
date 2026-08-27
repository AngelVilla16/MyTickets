"use client";

import {Asignar} from '@/app/actions/asignar';
import Label from '@/components/ui/Label';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import {useState} from 'react';
import '@/styles/modalasignar.css'

interface ModalAsignarProps {
    onClose: () => void;
}

export default function ModalAsignar({ onClose }: ModalAsignarProps){
    const [idUsuario, setIdUsuario] = useState<number>(0);
    const [idTicket, setIdTicket] = useState<number>(0);
    return(
        <div className="modal-container" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <div className='modal-form'>
                    <Label className='modal-label' text='Ingrese el id de ticket a asignar: ' />
                    <Input className='modal-input' type="number" onChange={(e)=>setIdTicket(Number(e.target.value))} />
                    <Label className='modal-label' text='Ingrese el id de usuario a asignar: '/>
                    <Input className='modal-input' type="number" onChange={(e)=>setIdUsuario(Number(e.target.value))}/>
                    <div className='modal-options'>
                        <Button className='btnAsignar' textBtn='Asignar' onClick={()=>{Asignar(idUsuario, idTicket); onClose();}}/>
                        <Button className='btnCancel' textBtn='Cancelar' onClick={onClose}/>

                    </div>
                </div>
            </div>
        </div>
    );
}