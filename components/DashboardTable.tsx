
import {query} from '@/lib/db';
import '@/styles/tabledash.css';

// Interfaz para definir el tipo de datos de cada ticket
interface Ticket {
    id: number;
    fecha?: string ;
    titulo?: string;
    subtitulo?: string;
    tipo: 'Frontend' | 'Backend' | 'Bug' | 'Sugerencia';
    estado: 'Activo' | 'Pendiente' | 'Cerrado';
    asignado: string;
}


export default async function TableDash() {
    //obtener tickets
    //Definimos la query sql
    const sql = `SELECT t.id_ticket, DATE_FORMAT(t.fecha, '%d/%m/%Y %H:%i') AS fecha, t.titulo, t.asunto, t.tipo, t.estado, u.nombre, u.apellido FROM tickets t JOIN usuarios u ON t.id_usuario = u.id_usuario ORDER BY t.id_ticket DESC`;

    const tickets:any = await query(sql);

  

  
    

    // Helper para la clase del estado
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
           
            <table className='dash-table'>
                <thead>
                    <tr>
                        <th className="table-title align-left">Ticket ID</th>
                        <th className="table-title align-left">Fecha</th>
                        <th className="table-title align-left">Título</th>
                        <th className="table-title">Tipo</th>
                        <th className="table-title">Estado</th>
                        <th className="table-title">Asignado</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.map((ticket:any) => (
                        <tr key={ticket.id_ticket}>
                            <td className="col-id">{ticket.id_ticket}</td>
                            <td className='col-date'>{ticket.fecha}</td>
                            <td className="col-title align-left">
                                <div className="title-bold">{ticket.titulo}</div>
                                {ticket.titulo && <div className="title-sub">{ticket.asunto}</div>}
                            </td>
                            <td>
                                <span className={`type-badge ${ticket.tipo}`}>
                                    {ticket.tipo}
                                </span>
                            </td>
                            <td>
                                <span className={`status-badge ${getEstadoClass(ticket.estado)}`}>
                                        ● {ticket.estado}
                                </span>
                            </td>
                            <td className="col-manage">
                                <div className="user-pill">
                                    <span className="user-avatar">{ticket.nombre.slice(0, 2).toUpperCase()}</span>
                                    <span>{ticket.nombre}</span>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}