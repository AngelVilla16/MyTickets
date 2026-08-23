import Button from '@/components/ui/Button';
import Selector from '@/components/ui/Selector';
import '@/styles/card.css';

interface CardProps {
    tituloCard?: string;
    fechaCard?: string;
    subtituloCard?: string;
    descripcion?: string;
    cardType?: string;
    cardStatus?: string;
}

export default function Card({ 
    tituloCard, 
    fechaCard, 
    subtituloCard, 
    descripcion, 
    cardType, 
    cardStatus 
}: CardProps) {
    const optionCards = [
        { value: 'Activo', label: 'Activo' },
        { value: 'Pendiente', label: 'Pendiente' },
        { value: 'Cerrado', label: 'Cerrado' }
    ];


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
                    <Button textBtn="Eliminar Ticket" className='option' />
                </div>

                <div className="action-group">
                    <Selector options={optionCards} />
                    <Button textBtn="Actualizar" className='option'/>
                </div>
            </div>
        </div>
    );
}