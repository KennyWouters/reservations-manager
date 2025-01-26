// app/api/auth/signup/route.js
import { NextResponse } from 'next/server';
import dbConnect from '/lib/db';
import User from '/models/User';

export async function POST(request) {
    await dbConnect();
    const { email, password, name } = await request.json();

    try {
        const user = await User.create({ email, password, name });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'Email already exists'
        }, { status: 400 });
    }
}