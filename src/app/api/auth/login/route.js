// app/api/auth/route.js
import { NextResponse } from 'next/server';

// Simple in-memory users (replace with database later)
const users = [
    { email: 'test@test.com', password: 'password123' }
];

export async function POST(request) {
    const { email, password } = await request.json();

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false }, { status: 401 });
}