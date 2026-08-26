import { query } from '@/lib/db';
import '@/styles/tabledash.css';

interface Ticket {
    id_ticket: number;
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
    // 1. Query base seleccionando 'asunto'
    let sql = `SELECT id_ticket, DATE_FORMAT(fecha, '%d/%m/%Y %H:%i') AS fecha, titulo, asunto, tipo, estado FROM tickets`;
    const values: string[] = [];

    // 2. Filtro condicional por columna 'estado'
    if (filtro && filtro !== 'Todos') {
        sql += ` WHERE estado = ?`;
        values.push(filtro);
    }
    if(filtro === 'Asignados'){
        sql = `SELECT t.id_ticket,DATE_FORMAT(t.fecha, '%d/%m/%Y %H:%i') AS fecha , t.titulo, t.asunto, t.descripcion, t.tipo, t.estado, u.nombre, u.apellido FROM tickets t JOIN usuarios u ON t.id_usuario = u.id_usuario`;
    }
    sql += ` ORDER BY id_ticket DESC`;

    // 3. Ejecución limpia evitando duplicación de variables
    const tickets: any = (await query(sql, values)) || [];

    // Helper para clases CSS de estado
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
                            <td className="col-id">#{ticket.id_ticket}</td>
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
                                        <span className="user-avatar">{ticket.nombre.slice(0, 2).toUpperCase()}</span>
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