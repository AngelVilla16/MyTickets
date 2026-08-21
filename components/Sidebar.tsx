"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation'; // 1. Importas usePathname
import '@/styles/sidebar.css';

interface SidebarProps {
    className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
    const pathname = usePathname(); // 2. Obtienes la ruta actual (ej: '/dashboard')

    return (
        <aside className={className}>
            <nav className='side-nav'>
                {/* 3. Comparas pathname === '/dashboard' para agregar la clase 'active' */}
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
            </nav>
        </aside>
    );
}