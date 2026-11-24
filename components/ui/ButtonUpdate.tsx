"use client";
import Button from '@/components/ui/Button';
import "@/styles/card.css";

import {updateTicket} from "@/app/actions/update";

interface ButtonUpdateProps{
    idTicket:string,
    estado:string,
}

export default function ButtonUpdate({idTicket, estado}:ButtonUpdateProps){

    return(
        <Button textBtn="Actualizar Ticket" className="btnUpdate" onClick={()=>updateTicket(idTicket, estado)}/>
    );
}