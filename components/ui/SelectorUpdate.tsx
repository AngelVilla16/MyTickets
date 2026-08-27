"use client";
import Selector from '@/components/ui/Selector';

interface SelectorUpdateProps {
    value: string;
    onChange: (value: string) => void;
}
export default function SelectorUpdate({value, onChange}:SelectorUpdateProps){

    const optionCards = [
        { value: 'Activo', label: 'Activo' },
        { value: 'Pendiente', label: 'Pendiente' },
        { value: 'Cerrado', label: 'Cerrado' }
    ];

    return(
        <Selector options={optionCards} value={value} onChange={(e) => onChange(e.target.value)}/>
    );
}