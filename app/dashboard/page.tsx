import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import Table from '@/components/DashboardTable';
import FilterWrapper from '@/components/FilterWrapper'; // <-- Importamos la lógica cliente del filtro
import '@/styles/dashboard.css';

interface DashProps {
    searchParams?: Promise<{ estado?: string }>;
}

async function getSession() {
    const cookieStore = await cookies();
    const token = cookieStore.get('ticket_session')?.value;

    if (!token) return null;

    try {
        const secretKey = process.env.JWT_SECRET || 'dev_secret_key_change_in_prod';
        const secret = new TextEncoder().encode(secretKey);
        const { payload } = await jwtVerify(token, secret);
        return payload;
    } catch (error) {
        return null;
    }
}

export default async function Dashboard({ searchParams }: DashProps) {
    const user: any = await getSession();

    // Lectura segura de searchParams
    const resolvedParams = searchParams ? await searchParams : {};
    const estado = resolvedParams.estado;

    return (
        <div className="dashboard-container">
            <header className="header-wrapper">
                <Navbar page="Dashboard de Soporte" />
            </header>

            <div className="dashboard-layout">
                <Sidebar className="sidebar" />

                <main className="content-area">
                    <div className="table-header">
                        <h2>Tickets Recientes</h2>
                        {/* Wrapper que contiene SelectorFilter y Button con eventos cliente */}
                        <FilterWrapper />
                    </div>

                    <div className="table-wrapper">
                        <Table filtro={estado} />
                    </div>
                </main>
            </div>
        </div>
    );
}