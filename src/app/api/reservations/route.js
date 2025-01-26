import { NextResponse } from 'next/server';
import dbConnect from '/lib/db';
import Reservation from '/models/Reservation';

export async function POST(request) {
    await dbConnect();
    const data = await request.json();

    try {
        await Reservation.create(data);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 400 });
    }
}