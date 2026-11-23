import { query } from '@/lib/supabaseDb';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import AgentCards from '@/components/AgentCards';
import '@/styles/agentes.css';
export const dynamic = 'force-dynamic';
export default async function Agentes() {
    const agentes: any = await query('SELECT id_usuario, nombre, apellido, correo, rol FROM usuarios');

    return (
        <>
            <header>
                <Navbar page="Miembros del equipo" />
            </header>
            <div className="agentes-layout">
                <Sidebar className="sidebar" />

                <main className="agentes-grid">
                    {agentes.map((agent: any) => {
                        const nombreCompleto = `${agent.nombre} ${agent.apellido}`;
                        return (
                            <AgentCards
                                key={agent.id_usuario}
                                idAgente={agent.id_usuario}
                                tituloCard={nombreCompleto}
                                subtituloCard={agent.rol}
                                descripcion={agent.correo}
                            />
                        );
                    })}
                </main>
            </div>
        </>
    );
}
