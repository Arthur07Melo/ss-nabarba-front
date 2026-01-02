import { NextRequest, NextResponse } from 'next/server';
import api from '../../../../bff/scheduleSystemApiConfig';

export async function POST(
  request: NextRequest
) {
  const { email, password } = await request.json();
  console.log(`[Request: /api/establishment/login] Starting processing login request for email: ${email}`);

  try {
    const response = await api.post('/establishment/login', {
      email,
      password
    });

    console.log('Login successful for email: ', email);

    return NextResponse.json(response.data); 
  } catch (error) {
    console.error('Login failed for email:', email, 'Error:', error);
    return NextResponse.json({ message: 'Failed to login' }, { status: 500 });
  }
}