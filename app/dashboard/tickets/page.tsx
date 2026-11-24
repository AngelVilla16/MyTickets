import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import Card from '@/components/ui/Cards';
import { getDb } from '@/lib/mongo';
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

export default async function tickets() {
    const user: any = await getSession();
    const idUser: any = user.id;
    const rol: any = user.role;

    const db = await getDb();
    const docs = await db.collection('tickets').find({ id_usuario: idUser }).toArray();

    const cardsData = docs.map((d: any) => ({
        id_ticket: d._id.toString(),
        titulo: d.titulo,
        asunto: d.asunto,
        descripcion: d.descripcion,
        fecha: d.fecha ? new Date(d.fecha).toLocaleString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '',
        tipo: d.tipo,
        estado: d.estado,
    }));

    return (
        <>
            <header>
                <Navbar page='Mis Tickets' rol={rol} />
            </header>
            <div className="ticketslayour">
                <Sidebar className="sidebar" />
                <main className="cards-grid">
                    {cardsData.map((card: any) =>
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
