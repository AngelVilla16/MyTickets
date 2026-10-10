"use client";

import { useState } from 'react';
import Label from '@/components/ui/Label';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Selector from '@/components/ui/Selector';
import '@/styles/modalasignar.css';
import '@/styles/modalticket.css';
import {CreateTicket} from '@/app/actions/CrearTicket';

interface ModalTicketProps {
    onClose: () => void;
}

const tiposTicket = [
    { value: 'Maquetado', label: 'Maquetado' },
    { value: 'Frontend', label: 'Frontend' },
    { value: 'Backend', label: 'Backend' },
    { value: 'DB', label: 'DB' },
    { value: 'QA', label: 'QA' },
];

export default function ModalTicket({ onClose }: ModalTicketProps) {
    const [titulo, setTitulo] = useState<string>('');
    const [descripcion, setDescripcion] = useState<string>('');
    const [detalle, setDetalle] = useState<string>('');
    const [tipo, setTipo] = useState<string>('');
    const estado = 'Activo';
    return (
        <div className="modal-container" onClick={onClose}>
            <div className="modal modal-ticket" onClick={(e) => e.stopPropagation()}>
                <div className="modal-form">
                    <h2 className="modal-title">Nuevo Ticket</h2>

                    <Label className="modal-label" text="Título" />
                    <Input
                        className="modal-input"
                        type="text"
                        placeholder="Título del ticket"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                    />

                    <Label className="modal-label" text="Descripción" />
                    <textarea
                        className="modal-textarea"
                        placeholder="Descripción breve del ticket"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                    />

                    <Label className="modal-label" text="Detalle" />
                    <textarea
                        className="modal-textarea"
                        placeholder="Detalle del ticket"
                        value={detalle}
                        onChange={(e) => setDetalle(e.target.value)}
                    />

                    <Label className="modal-label" text="Tipo" />
                    <Selector
                        className="modal-select"
                        options={tiposTicket}
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                    />

                    <div className="modal-options">
                        <Button className="btnAsignar" textBtn="Crear ticket" onClick={()=> {
                            CreateTicket(titulo, descripcion, detalle, tipo, estado),
                                onClose()
                        }} />
                        <Button className="btnCancel" textBtn="Cancelar" onClick={onClose} />
                    </div>
                </div>
            </div>
        </div>
    );
}
