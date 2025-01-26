// app/api/reservations/route.js
import { NextResponse } from 'next/server';

// Store reservations in memory (replace with database later)
let reservations = [];

export async function POST(request) {
    const data = await request.json();

    reservations.push(data);

    return NextResponse.json({ success: true });
}