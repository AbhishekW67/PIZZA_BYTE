import { NextResponse } from 'next/server';
import { getAstraClient } from '@/lib/astraClient';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request) {
    try {
        const astraClient = await getAstraClient();
        const { name, description, price, imageUrl } = await request.json();
        // Validate input fields
        console.log(name, description, price, imageUrl);

        if (!name || !description || !price || !imageUrl) {
            return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
        }

        // Generate a UUID for the new product
        const productId = uuidv4();

        // CQL query to insert a new product
        const query = `
      INSERT INTO pizza_keyspace.products (id, name, description, price, image_url) 
      VALUES (?, ?, ?, ?, ?)
    `;

        // Execute the query with the product data
        await astraClient.execute(query, [productId, name, description, price, imageUrl], { prepare: true });

        return NextResponse.json({ message: 'Product added successfully!', productId });
    } catch (error) {
        console.error('Error during product addition:', error);
        return NextResponse.json({ error: 'Product addition failed.' }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const astraClient = await getAstraClient();
        const { productId } = await request.json();

        // Validate input
        if (!productId) {
            return NextResponse.json({ error: 'Product ID is required.' }, { status: 400 });
        }

        // CQL query to delete a product by ID
        const query = 'DELETE FROM pizza_keyspace.products WHERE id = ?';

        // Execute the query with the product ID
        await astraClient.execute(query, [productId], { prepare: true });

        return NextResponse.json({ message: 'Product deleted successfully!' });
    } catch (error) {
        console.error('Error deleting product:', error);
        return NextResponse.json({ error: 'Failed to delete product.' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const astraClient = await getAstraClient();

        // CQL query to fetch all products
        const query = 'SELECT * FROM pizza_keyspace.products';

        // Execute the query
        const result = await astraClient.execute(query);

        // Extract rows (products) from the result
        const products = result.rows;

        return NextResponse.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json({ error: 'Failed to fetch products.' }, { status: 500 });
    }
}