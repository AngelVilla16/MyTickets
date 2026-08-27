import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import Card from '@/components/ui/Cards';
import {query} from '@/lib/db';
import '@/styles/ticketspage.css';

async function getSession() {
    const cookieStore = await cookies();
    const token = cookieStore.get('ticket_session')?.value;

    if (!token) return null;

    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(token, secret);
        return payload;
    } catch (error) {
        return null;
    }
}

export default async function tickets(){
    const user:any = await getSession();
    const idUser:any = user.id;

    const sql = `SELECT id_ticket, titulo, asunto, descripcion, DATE_FORMAT(fecha, '%d/%m/%Y %H:%i') AS fecha, tipo, estado FROM tickets WHERE id_usuario = ?`;

    const cardsData:any = await query(sql,[idUser]);

    return(
        <>  
            <header>
                <Navbar page='Mis Tickets'/>
            </header>
            <div className="ticketslayour">
                <Sidebar className="sidebar"/>
                 <main className="cards-grid">
                    {cardsData.map((card:any)=>
                        <Card key={card.id_ticket}
                              idTicket={card.id_ticket}
                            tituloCard={card.titulo}
                            subtituloCard={card.asunto}
                            fechaCard={card.fecha}
                            descripcion={card.descripcion}
                            cardType={card.tipo}
                            cardStatus={card.estado}
                        />

                        
                    )}

                </main>
            </div>
        </>
    );
}