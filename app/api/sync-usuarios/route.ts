import { NextResponse } from 'next/server';
import { syncUsuarios } from '@/lib/syncUsuarios';

export async function GET() {
    try {
        const total = await syncUsuarios();
        return NextResponse.json({ mensaje: 'Sincronización completa', total });
    } catch (error) {
        console.error('Error sincronizando usuarios:', error);
        return NextResponse.json({ mensaje: 'Error sincronizando' }, { status: 500 });
    }
}
