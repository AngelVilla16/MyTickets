import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import Table from '@/components/DashboardTable';
import Button from '@/components/ui/Button';
import '@/styles/dashboard.css';

async function getSession() {
    const cookieStore = await cookies();
    const token = cookieStore.get('ticket_session')?.value;

    if (!token) return null;

    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(token, secret);
        return payload;
    } catch (error) {
        return null;
    }
}

export default async function Dashboard() {
    const user: any = await getSession();

    return (
        <div className="dashboard-container">
            {/* Header  */}
            
            <header className="header-wrapper">
                <Navbar page="Dashboard de Soporte" />
            </header>

            {/* Layout Principal Abajo Sidebar */}
            <div className="dashboard-layout">
                <Sidebar className="sidebar" />

                {/* Main */}
                <main className="content-area">
                    <div className="table-header">
                        <h2>Tickets Recientes</h2>
                        <div className="opciones">
                            <Button textBtn="Todos" />
                            <Button textBtn="Abiertos" />
                            <Button textBtn="EN PROG." />
                            <Button textBtn="Resueltos" />
                        </div>
                    </div>

                    <div className="table-wrapper">
                        <Table />
                    </div>
                </main>
            </div>
        </div>
    );
}