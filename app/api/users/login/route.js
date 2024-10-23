import { NextResponse } from 'next/server';
import { getAstraClient } from '@/lib/astraClient';

export async function POST(request) {
  try {
    const astraClient = await getAstraClient();
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
    }

    const query = `
      SELECT id, username, email, password 
      FROM pizza_keyspace.users 
      WHERE email = ? 
      LIMIT 1
      ALLOW FILTERING;
    `;  

    const result = await astraClient.execute(query, [email], { prepare: true });

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    const user = result.rows[0];

    if (user.password !== password) {
      return NextResponse.json({ error: 'Invalid password.' }, { status: 401 });
    }

    return NextResponse.json({
      message: 'Login successful!',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json({ error: 'Login failed.' }, { status: 500 });
  }
}
