// components/ui/TicketStatusUpdater.tsx
'use client';

import { useState } from 'react';
import SelectorUpdate from '@/components/ui/SelectorUpdate';
import ButtonUpdate from '@/components/ui/ButtonUpdate';

interface TicketStatusUpdaterProps {
    idTicket: number;
    estadoInicial?: string;
}

export default function TicketStatusUpdater({ idTicket, estadoInicial }: TicketStatusUpdaterProps) {
    const [estado, setEstado] = useState(estadoInicial ?? 'Activo');

    return (
        <>
            <SelectorUpdate value={estado} onChange={setEstado} />
            <ButtonUpdate idTicket={idTicket} estado={estado} />
        </>
    );
}