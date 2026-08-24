import '@/styles/agentecard.css';

interface CardProps {
    tituloCard?: string;     // Nombre del agente
    subtituloCard?: string;  // Rol / Puesto (ej. Dev Backend)
    descripcion?: string;    // Email o teléfono de contacto
}

export default function AgentCards({ tituloCard, subtituloCard, descripcion }: CardProps) {
    // Generar iniciales para el avatar si hay un nombre
    const iniciales = tituloCard 
        ? tituloCard.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
        : 'AG';

    return (
        <div className="agent-card">
            <div className="agent-header">
                <div className="agent-avatar">{iniciales}</div>
                <div className="agent-info">
                    <h1 className="agent-title">{tituloCard || 'Sin Nombre'}</h1>
                    <h2 className="agent-subtitle">{subtituloCard || 'Agente del Sistema'}</h2>
                </div>
            </div>

            <div className="agent-body">
                <span className="contact-label">Contacto:</span>
                <p className="contact-value">{descripcion || 'No especificado'}</p>
            </div>
        </div>
    );
}