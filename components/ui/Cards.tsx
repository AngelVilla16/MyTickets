import DeleteButton from '@/components/ui/DeleteBtn';
import TicketStatusUpdater from "@/components/ui/TicketStatusUpdater";
import '@/styles/card.css';

interface CardProps {
    tituloCard?: string;
    fechaCard?: string;
    subtituloCard?: string;
    descripcion?: string;
    cardType?: string;
    cardStatus?: string;
    idTicket: number;

}

export default function Card({ 
    tituloCard, 
    fechaCard, 
    subtituloCard, 
    descripcion, 
    cardType, 
    cardStatus,
    idTicket,

}: CardProps) {



    const tipoClass = cardType ? cardType.toLowerCase().trim() : '';
    
    const getEstadoClass = (status?: string) => {
        switch (status?.trim()) {
            case 'Activo': return 'status-activo';
            case 'Pendiente': return 'status-pendiente';
            case 'Cerrado': return 'status-cerrado';
            default: return '';
        }
    };

    return (
        <div className="card">
        
            <div className="card-top-bar">
                <div className="card-badges">
                    {cardType && (
                        <span className={`type-badge ${tipoClass}`}>
                            {cardType}
                        </span>
                    )}
                    {cardStatus && (
                        <span className={`status-badge ${getEstadoClass(cardStatus)}`}>
                            ● {cardStatus}
                        </span>
                    )}
                </div>
                <img src="/assets/date.svg" alt="Fecha" className="icon-card" />
                <span className="card-date">{fechaCard}</span>
            </div>

            {/* Encabezado con títulos */}
            <div className="card-header">
                <h1 className="card-title">{tituloCard}</h1>
                {subtituloCard && <h2 className="card-subtitle">{subtituloCard}</h2>}
            </div>

            {/* Cuerpo con la descripción */}
            <p className="card-desc">
                {descripcion || 'Sin descripción proporcionada.'}
            </p>

            {/* Acciones y selector en el pie de la tarjeta */}
            <div className="card-options">
                <div className="action-group">
                    <img src="/assets/delete.svg" alt="Eliminar ticket" className="icon-card" />
                    <DeleteButton idTicket={idTicket}/>
                </div>

                <div className="action-group">
                    <TicketStatusUpdater idTicket={idTicket} estadoInicial={cardStatus} />
                </div>
            </div>
        </div>
    );
}