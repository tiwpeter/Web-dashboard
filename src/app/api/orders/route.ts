import { NextResponse } from "next/server";
import { getDBConnection } from "../../lib/db"; // Adjust the path as necessary
import { NextRequest } from "next/server"; // Import NextRequest

type GroupedOrder = {
  order_id: number;
  user_email: string;
  total_price: number;
  shipping_address: string;
  phone: string;
  payment_method: string;
  created_at: string;
  items: {
    order_item_id: number;
    product_id: number;
    product_name: string;
    product_price: number;
    product_quantity: number;
  }[];
  total_quantity: number;
  calculated_total: number;
};

type OrderRow = {
  order_id: number;
  user_email: string;
  total_price: number;
  shipping_address: string;
  phone: string;
  payment_method: string;
  created_at: string;
  order_item_id: number;
  product_id: number;
  product_name: string;
  product_price: number;
  product_quantity: number;
};

export async function POST(request: NextRequest) { // Type the request as NextRequest
  let db;
  try {
    db = await getDBConnection();

    // Start a transaction
    await db.run("BEGIN");

    //ตัวข้อมูลที่ส่งมา
    const requestBody = JSON.parse(await request.text());  // Use text and parse it

    //ตัวแปรเก็บข้อมูล
    const { cardInfo, shippingInfo, cart, totalPrice } = requestBody;
    const fullAddress = `${shippingInfo.address}, ${shippingInfo.district}, ${shippingInfo.province}, ${shippingInfo.postalCode}`;

    console.log("Cart:", cart);
    // เพิ่มข้อมูลลงในตาราง orders กับ shippingInfo
    const result = await db.run(
      `INSERT INTO orders (user_email, total_price, shipping_address, phone, payment_method)
       VALUES (?, ?, ?, ?, ?)`,

      [
        shippingInfo.name,                    // Assuming `name` is the user email or the user's name
        totalPrice,                            // Make sure you're passing the calculated total price here
        fullAddress,         // Shipping address
        shippingInfo.phone,                    // Phone number
        cardInfo.payment_method                // Payment method (you might need to adjust this)
      ]
    );

    const orderId = result.lastID; // ดึง ID คำสั่งซื้อ

    // เพิ่มสินค้าในคำสั่งซื้อลงในตาราง order_items
    for (const item of cart) {
      await db.run(
        `INSERT INTO order_items (order_id, product_id, quantity, price, name) 
         VALUES (?, ?, ?, ?, ?)`, // Added `name` here
        [orderId, item.id, item.quantity, item.price, item.name] // Adding the product name
      );
    }

    await db.run("COMMIT"); // บันทึกธุรกรรม

    return NextResponse.json({ message: "Order placed successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({  }, { status: 500 });
  }
}

export async function GET(request: NextRequest) { // Type the request as NextRequest
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

    const orders: OrderRow[] = await db.all(ordersQuery); // Fetch the orders with their items

    // Group orders with their respective items and calculate the total price for each order
    const groupedOrders = orders.reduce<{ [key: number]: GroupedOrder }>((acc, row) => {
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
          total_quantity: 0,  // Add a field to store the total quantity of items
          calculated_total: 0   // Add a field to store the calculated total price
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

        // Add up the total quantity of items for this order
        acc[orderId].total_quantity += row.product_quantity;

        // Calculate the total price by multiplying the product price with the quantity
        acc[orderId].calculated_total += row.product_price * row.product_quantity;
      }
      return acc;
    }, {});

    // Convert the grouped orders object into an array
    const responseOrders = Object.values(groupedOrders);

    return NextResponse.json(responseOrders, { status: 200 });

  } catch (error) {
    return NextResponse.json({  }, { status: 500 });
  }
}
