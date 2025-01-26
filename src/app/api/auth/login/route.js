// app/api/auth/login/route.js
import { NextResponse } from 'next/server';
import dbConnect from '/lib/db';
import User from '/models/User';

export async function POST(request) {
  await dbConnect();

  try {
    const body = await request.json();
    const { email, password } = body;

    const user = await User.findOne({ email });

    if (user && await user.comparePassword(password)) {
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