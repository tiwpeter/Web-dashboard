import { NextResponse } from "next/server";
import { getDBConnection } from "../../../lib/db"; // Adjust the path as necessary

interface OrderItem {
  order_item_id: number;
  product_id: number;
  product_name: string;
  product_price: number;
  product_quantity: number;
}

interface Order {
  order_id: number;
  user_email: string;
  total_price: number;
  shipping_address: string;
  phone: string;
  payment_method: string;
  created_at: string;
  items: OrderItem[];
}

interface Database {
  all: (query: string, params: any[]) => Promise<any[]>;  // Add the type for `all` function
  get: (query: string, params: any[]) => Promise<any>;  // Add the type for `get` function
}

export async function GET(request : Request, context:any) {
  let db: Database;
  try {
    db = await getDBConnection();

    // Get the `id` from the request params (dynamic route)
    const { id } = context; // This should be the dynamic `id` from the URL

    // Query to get the order and its associated items
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
      WHERE o.id = ?
    `;

    // Fetch the order by id
    const orders = await db.all(ordersQuery, [id]); // Use the `id` parameter in the query

    // If the order doesn't exist, return a 404 error
    if (orders.length === 0) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Group orders with their respective items
    const groupedOrders = orders.reduce<{ [key: number]: Order }>((acc, row) => {
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
          items: [],
        };
      }
      if (row.order_item_id) {
        acc[orderId].items.push({
          order_item_id: row.order_item_id,
          product_id: row.product_id,
          product_name: row.product_name,
          product_price: row.product_price,
          product_quantity: row.product_quantity,
        });
      }
      return acc;
    }, {});

    // Convert the grouped orders object into an array
    const responseOrder = Object.values(groupedOrders)[0]; // There should only be one order since we're using a unique id

    return NextResponse.json(responseOrder, { status: 200 });

  } catch (error) {
    console.error("🔥 Error:", );
    return NextResponse.json({  }, { status: 500 });
  }
}
