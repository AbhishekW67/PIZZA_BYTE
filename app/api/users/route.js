import { NextResponse } from 'next/server';
import { getAstraClient } from '@/lib/astraClient';
import { v4 as uuidv4 } from 'uuid'; // UUID for generating unique IDs

export async function POST(request) {
  try {
    const astraClient = await getAstraClient();
    const { username, email, password } = await request.json();

    if (!username || !email || !password) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    const userId = uuidv4();

    const query = `
      INSERT INTO pizza_keyspace.users (id, username, email, password) 
      VALUES (?, ?, ?, ?)
    `;

    await astraClient.execute(query, [userId, username, email, password], { prepare: true });

    return NextResponse.json({ message: 'User registered successfully!', userId });
  } catch (error) {
    console.error('Error during registration:', error);
    return NextResponse.json({ error: 'User registration failed.' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const astraClient = await getAstraClient();

    const query = 'SELECT * FROM pizza_keyspace.users';

    const result = await astraClient.execute(query);

    const users = result.rows;

    return NextResponse.json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users.' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const astraClient = await getAstraClient();

    // Parse the request body to get the user ID
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required.' }, { status: 400 });
    }

    // CQL query to delete a user by ID
    const query = 'DELETE FROM pizza_keyspace.users WHERE id = ?';

    // Execute the query with the user ID
    await astraClient.execute(query, [userId], { prepare: true });

    return NextResponse.json({ message: 'User deleted successfully!' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ error: 'Failed to delete user.' }, { status: 500 });
  }
}