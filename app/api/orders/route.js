import { getAstraClient } from '@/lib/astraClient';
import { NextResponse } from 'next/server';

export async function POST(request) {
    const { cartItems, userEmail, totalPrice, address1, address2, paymentMethod, mobileNumber } = await request.json();

    try {
        const query = `
        INSERT INTO pizza_keyspace.orders (id, order_by, items, total_price, address_line1, address_line2, payment_method, mobile_number, created_at)
        VALUES (uuid(), ?, ?, ?, ?, ?, ?, ?, toTimestamp(now()));
      `;

        const itemsString = JSON.stringify(cartItems);  // Convert cartItems to JSON string

        const client = await getAstraClient();

        await client.execute(query, [
            userEmail,
            itemsString,  // Store JSON string
            totalPrice,
            address1,
            address2 || null,
            paymentMethod,
            mobileNumber,
        ]);

        return NextResponse.json({ message: "Order placed successfully!" });
    } catch (error) {
        console.error("Error placing order:", error);
        return NextResponse.json({ error: "Failed to place order." }, { status: 500 });
    }
}


export async function GET() {
    try {
        const astraClient = await getAstraClient();

        

        const query = 'SELECT * FROM pizza_keyspace.orders';
        
        // Execute the query and fetch results
        const result = await astraClient.execute(query);
        console.log('Query executed, raw result:', result);

        const orders = result.rows.map(order => {
            let parsedItems = [];

            // Check the length of the items string
            if (typeof order.items === 'string' && order.items.length < 100000) {  // Limit to avoid large strings
                try {
                    // Parse the items only once
                    parsedItems = JSON.parse(order.items);
                    console.log('Parsed items field:', parsedItems);
                } catch (error) {
                    console.error('Error parsing items for order:', order.id, error);
                }
            } else {
                console.warn('Skipping parsing for order:', order.id, 'due to invalid items length.');
            }

            return {
                id: order.id,
                address_line1: order.address_line1,
                address_line2: order.address_line2,
                created_at: order.created_at,
                items: parsedItems, // Properly parsed items
                mobile_number: order.mobile_number,
                order_by: order.order_by,
                payment_method: order.payment_method// Convert BigDecimal to string
            };
        });

        console.log('Final orders data:', orders);

        return NextResponse.json({ orders });
    } catch (error) {
        console.error('Error fetching orders:', error.message);
        return NextResponse.json({ error: 'Failed to fetch orders.' }, { status: 500 });
    }
}
