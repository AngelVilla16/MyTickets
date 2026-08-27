"use client";

import {useState} from 'react';
import Button from '@/components/ui/Button';
import ModalAsignar from '@/components/ui/ModalAsignar';
import '@/styles/navbar.css';

export default function AsignarBtn() {
    const [visible, setVisible] = useState<boolean>(false);
    return(
        <>
            <Button textBtn="Asignar Ticket" className='navBtn' onClick={() => setVisible(true)} />
            {visible && (
                <ModalAsignar onClose={() => setVisible(false)} />
            )}
        </>
    );
}