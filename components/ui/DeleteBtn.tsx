"use client";

import Button from '@/components/ui/Button';
import {deleteTicket} from "@/app/actions/delete";

interface DeleteButtonProps {
    idTicket: number;
}

export default function DeleteButton({idTicket}: DeleteButtonProps) {
    return(
        <Button
            type="button"
            textBtn="Eliminar Ticket"
            onClick={()=>deleteTicket(idTicket)}
        />
    );
}