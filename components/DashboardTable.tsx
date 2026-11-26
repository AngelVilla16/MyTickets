import { getDb } from '@/lib/mongo';
import CopyButton from '@/components/ui/CopyButton';
import '@/styles/tabledash.css';
import { ObjectId } from 'mongodb';

interface Ticket {
    id_ticket: string;
    fecha?: string;
    titulo?: string;
    asunto?: string;
    tipo: 'Frontend' | 'Backend' | 'Bug' | 'Sugerencia';
    estado: 'Activo' | 'Pendiente' | 'Cerrado';
}

interface TableDashProps {
    filtro?: string;
}

export default async function TableDash({ filtro }: TableDashProps) {
    const db = await getDb();
    const docs = await db.collection('tickets').find({}).sort({ _id: -1 }).toArray();

    let tickets: any[] = docs.map((d: any) => ({
        id_ticket: d._id.toString(),
        fecha: d.fecha ? new Date(d.fecha).toLocaleString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '',
        titulo: d.titulo,
        asunto: d.asunto,
        descripcion: d.descripcion,
        tipo: d.tipo,
        estado: d.estado,
        id_usuario: d.id_usuario,
        nombre: '',
        apellido: '',
    }));

    if (filtro && filtro !== 'Todos' && filtro !== 'Asignados') {
        tickets = tickets.filter((t) => t.estado === filtro);
    }

    if (filtro === 'Asignados') {
        const db = await getDb();
        const usuarios: any = await db.collection('usuarios').find({}).toArray();
        const userMap = new Map(usuarios.map((u: any) => [Number(u.id_usuario), u]));
        tickets = tickets
            .filter((t) => t.id_usuario != null)
            .map((t) => {
                const u: any = userMap.get(Number(t.id_usuario));
                return { ...t, nombre: u?.nombre ?? 'Desconocido', apellido: u?.apellido ?? '' };
            });
    }

    const getEstadoClass = (estado: string) => {
        switch (estado?.trim()) {
            case 'Activo': return 'status-activo';
            case 'Pendiente': return 'status-pendiente';
            case 'Cerrado': return 'status-cerrado';
            default: return '';
        }
    };

    return (
        <div className="container-table">
            <table className="dash-table">
                <thead>
                <tr>
                    <th className="table-title align-left">Ticket ID</th>
                    <th className="table-title align-left">Fecha</th>
                    <th className="table-title align-left">Título</th>
                    <th className="table-title">Tipo</th>
                    <th className="table-title">Estado</th>
                    {filtro === 'Asignados' &&(
                        <th className="table-title"> Asignado</th>
                    )}
                </tr>
                </thead>
                <tbody>
                {tickets.length === 0 ? (
                    <tr>
                        <td colSpan={5} style={{ textAlign: 'center', padding: '20px', color: '#8b949e' }}>
                            No se encontraron tickets con este filtro.
                        </td>
                    </tr>
                ) : (
                    tickets.map((ticket: any) => (
                        <tr key={ticket.id_ticket}>
                            <td className="col-id">#{ticket.id_ticket}<CopyButton text={ticket.id_ticket} /></td>
                            <td className="col-date">{ticket.fecha}</td>
                            <td className="col-title align-left">
                                <div className="title-bold">{ticket.titulo}</div>
                                {ticket.asunto && (
                                    <div className="title-sub">{ticket.asunto}</div>
                                )}
                            </td>
                            <td>
                                    <span className={`type-badge ${ticket.tipo?.toLowerCase()}`}>
                                        {ticket.tipo}
                                    </span>
                            </td>
                            <td>
                                    <span className={`status-badge ${getEstadoClass(ticket.estado)}`}>
                                        ● {ticket.estado}
                                    </span>
                            </td>
                            {filtro === 'Asignados' && (
                                <td className='col-manage'>
                                    <div className='user-pill'>
                                        <span className="user-avatar">{ticket.nombre?.slice(0, 2).toUpperCase()}</span>
                                        <span>{ticket.nombre}</span>
                                    </div>
                                </td>
                            )}
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
}
