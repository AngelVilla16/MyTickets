import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import Table from '@/components/DashboardTable';
import FilterWrapper from '@/components/FilterWrapper'; // <-- Importamos la lógica cliente del filtro
import { getSession, esJefe } from '@/lib/auth';
import '@/styles/dashboard.css';

interface DashProps {
    searchParams?: Promise<{ estado?: string }>;
}

export default async function Dashboard({ searchParams }: DashProps) {
    const user = await getSession();
    const puedeAsignar = esJefe(user?.correo);

    // Lectura segura de searchParams
    const resolvedParams = searchParams ? await searchParams : {};
    const estado = resolvedParams.estado;

    return (
        <div className="dashboard-container">
            <header className="header-wrapper">
                <Navbar page="Dashboard de Soporte" puedeAsignar={puedeAsignar} />
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