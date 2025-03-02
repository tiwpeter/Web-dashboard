import { NextResponse } from "next/server";
import { getDBConnection } from "../../lib/db"; // Adjust the path as necessary

export async function POST(request) {
  let db;
  try {
    db = await getDBConnection();

    // Start a transaction
    await db.run("BEGIN");

    // Use request.body (text) and then parse it into JSON
    const requestBody = JSON.parse(await request.text());  // Use text and parse it

    const { 
      user_email, 
      total_price, 
      shipping_address, 
      phone, 
      payment_method, 
      order_items // Assuming order_items is an array of items
    } = requestBody;

    // Log the data received from the client
    console.log("Received request body:", requestBody);
    console.log("User Email:", user_email);
    console.log("Total Price:", total_price);
    console.log("Shipping Address:", shipping_address);
    console.log("Phone:", phone);
    console.log("Payment Method:", payment_method);
    console.log("Order Items:", order_items);

    // Insert payment method into the payments table and get payment_id
    const paymentResult = await db.run(
      "INSERT INTO payments (method) VALUES (?)",
      [payment_method]
    );
    const paymentId = paymentResult.lastID; // Get the payment_id of the inserted payment

    // Insert order into orders table
    const result = await db.run(
      "INSERT INTO orders (user_email, total_price, shipping_address, phone, payment_id, payment_method) VALUES (?, ?, ?, ?, ?, ?)",
      [user_email, total_price, shipping_address, phone, paymentId, payment_method]
    );
    const orderId = result.lastID; // Get the order_id of the inserted order

    // Insert order items into order_items table
    for (const item of order_items) {
      await db.run(
        "INSERT INTO order_items (order_id, product_id, name, price, quantity) VALUES (?, ?, ?, ?, ?)",
        [orderId, item.product_id, item.name, item.price, item.quantity]
      );
    }

    // Commit the transaction
    await db.run("COMMIT");

    return NextResponse.json({ orderId, paymentId }, { status: 201 });

  } catch (error) {
    // Rollback the transaction if an error occurs
    if (db) await db.run("ROLLBACK");
    console.error("🔥 Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  let db;
  try {
    db = await getDBConnection();

    // Get the orders with their associated order items
    const ordersQuery = `
      SELECT 
        o.id AS order_id,
        o.user_email,
        o.total_price,
        o.shipping_address,
        o.phone,
        o.payment_method,
        o.created_at,
        oi.id AS order_item_id,
        oi.product_id,
        oi.name AS product_name,
        oi.price AS product_price,
        oi.quantity AS product_quantity
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
    `;

    const orders = await db.all(ordersQuery); // Fetch the orders with their items

    // Group orders with their respective items
    const groupedOrders = orders.reduce((acc, row) => {
      const orderId = row.order_id;
      if (!acc[orderId]) {
        acc[orderId] = {
          order_id: row.order_id,
          user_email: row.user_email,
          total_price: row.total_price,
          shipping_address: row.shipping_address,
          phone: row.phone,
          payment_method: row.payment_method,
          created_at: row.created_at,
          items: []
        };
      }
      if (row.order_item_id) {
        acc[orderId].items.push({
          order_item_id: row.order_item_id,
          product_id: row.product_id,
          product_name: row.product_name,
          product_price: row.product_price,
          product_quantity: row.product_quantity
        });
      }
      return acc;
    }, {});

    // Convert the grouped orders object into an array
    const responseOrders = Object.values(groupedOrders);

    return NextResponse.json(responseOrders, { status: 200 });

  } catch (error) {
    console.error("🔥 Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
