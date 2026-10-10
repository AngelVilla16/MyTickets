"use client";

import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import AsignarBtn from '@/components/AsignarBtn';
import ModalTicket from '@/components/ui/ModalTicket';
import '@/styles/navbar.css';

interface NavbarProps {
    page?: string;
    rol?:string;
}

export default function Navbar({ page, rol }: NavbarProps) {
    const [fechaStr, setFechaStr] = useState<string>('');
    const [modalTicket, setModalTicket] = useState<boolean>(false);

    useEffect(() => {
        // Se ejecuta solo en el cliente para evitar desacuerdos de hidratación con el servidor
        setFechaStr(new Date().toLocaleDateString('es-MX', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }));
    }, []);
    console.log({ page, rol });
    console.log(page === "Dashboard de Soporte", rol === 'Admin');
    return (
        <header className="navbar-container">
            <nav className='navbar'>
                <div className="left">
                    <div className="brand">
                        <img src="/assets/mytickets.png" alt="Logo de MyTickets" className="nav-icon" />
                        <span className='title'>MyTickets</span>
                    </div>
                </div>
                
                <div className="right">
                    <div className="page-info">
                        <h3 className="page-title">{page}</h3>
                        {fechaStr && <span className='date'>{fechaStr}</span>}
                    </div>
                    {page === "Dashboard de Soporte" && rol==='Admin'  && (
                        <div className="action">
                            <AsignarBtn />
                        </div>
                    )}
                    {page=== 'Mis Tickets' && rol==='Admin' && (
                        <div className="action">
                            <Button textBtn="Agregar ticket" className='navBtn' onClick={() => setModalTicket(true)} />
                        </div>
                    )}
                </div>
            </nav>

            {modalTicket && (
                <ModalTicket onClose={() => setModalTicket(false)} />
            )}
        </header>
    );
}