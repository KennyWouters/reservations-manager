// app/api/auth/signup/route.js
import { NextResponse } from 'next/server';

let users = [];

export async function POST(request) {
    const { email, password, name } = await request.json();

    if (users.find(u => u.email === email)) {
        return NextResponse.json({
            success: false,
            message: 'Email already exists'
        }, { status: 400 });
    }

    users.push({ email, password, name });

    return NextResponse.json({ success: true });
}