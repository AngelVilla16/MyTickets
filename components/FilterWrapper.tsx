'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import SelectorFilter from '@/components/ui/SelectorFilter';
import Button from '@/components/ui/Button';

export default function FilterWrapper() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [selectedValue, setSelectedValue] = useState<string>(
        searchParams.get('estado') || ''
    );

    const filterOptions = [
        { value: '', label: 'Todos' },
        { value: 'Activo', label: 'Activos' },
        { value: 'Pendiente', label: 'En Progreso' },
        { value: 'Cerrado', label: 'Terminados' },
        { value: 'Asignados', label: 'Asignados' }
    ];

    const handleFilter = () => {
        const params = new URLSearchParams(searchParams.toString());

        if (selectedValue) {
            params.set('estado', selectedValue);
        } else {
            params.delete('estado');
        }

        // Actualiza los parametros en la barra de direccion
        router.push(`?${params.toString()}`);
    };

    return (
        <div className="opciones">
            <SelectorFilter
                name="filtro"
                className="filterselector"
                options={filterOptions}
                value={selectedValue}
                onChange={(e) => setSelectedValue(e.target.value)}
            />
            <Button textBtn="Filtrar" onClick={handleFilter} />
        </div>
    );
}