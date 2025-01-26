// app/api/auth/login/route.js
import { NextResponse } from 'next/server';

// Temporary in-memory storage (replace with MongoDB later)
const users = [
    { email: 'test@test.com', password: 'password123' }
];

export async function POST(request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            return NextResponse.json({ success: true });
        }

        return NextResponse.json(
            { success: false, message: 'Invalid credentials' },
            { status: 401 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, message: 'Server error' },
            { status: 500 }
        );
    }
}