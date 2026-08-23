"use client";

import Button from '@/components/ui/Button';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; 
import { useTransition } from 'react';
import { logout } from '@/app/actions/auth';
import '@/styles/sidebar.css';

interface SidebarProps {
    className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
    const pathname = usePathname(); 
    const [isPending, startTransition] = useTransition();
    const handleLogout = () => {
        startTransition(async () => {
            await logout();
        });
    };
    return (
        <aside className={className}>
            <nav className='side-nav'>
                
                <Link 
                    href='/dashboard' 
                    className={`link-container ${pathname === '/dashboard' ? 'active' : ''}`}
                >
                    <img src="/assets/dashboardicon.svg" alt="Dashboard" className="nav-icon" />
                    <span className='enlace'>Dashboard</span>
                </Link>

                <Link 
                    href='/dashboard/tickets' 
                    className={`link-container ${pathname === '/dashboard/tickets' ? 'active' : ''}`}
                >
                    <img src="/assets/ticketicon.svg" alt="Tickets" className="nav-icon" />
                    <span className='enlace'>Tickets</span>
                </Link>

                <Link 
                    href='/dashboard/agentes' 
                    className={`link-container ${pathname === '/dashboard/agentes' ? 'active' : ''}`}
                >
                    <img src="/assets/personalicon.svg" alt="Equipo" className="nav-icon" />
                    <span className='enlace'>Equipo</span>
                </Link>
                <div className="btn">
                    <img src="/assets/cerrar.svg" alt="Cerrar Sesion" className="nav-icon" />
                    <Button onClick={handleLogout} className='salir' textBtn='Cerrar Sesión'/>
                </div>
            </nav>
        </aside>
    );
}