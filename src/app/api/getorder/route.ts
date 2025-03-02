import { NextResponse } from "next/server";
import { getDBConnection } from "../../lib/db"; // ปรับ path ตามจริง

export async function GET(req) {
  try {
    const db = await getDBConnection();

    // ดึงค่า orderId จาก query parameters
    const { searchParams } = req.nextUrl;
    const orderId = searchParams.get('orderId');

    // ตรวจสอบว่า orderId ถูกส่งมาหรือไม่
    if (!orderId) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
    }

    // ดึงข้อมูลออร์เดอร์
    const order = await new Promise((resolve, reject) => {
      db.get(
        `SELECT id, user_email, total_price, shipping_address, phone, payment_method, created_at FROM orders WHERE id = ?`,
        [orderId],
        (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        }
      );
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // ดึงข้อมูลสินค้าของออร์เดอร์
    const orderItems = await new Promise((resolve, reject) => {
      db.all(
        `SELECT product_id, name, price, quantity FROM order_items WHERE order_id = ?`,
        [orderId],
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    });

    // รวมข้อมูลออร์เดอร์และสินค้าที่สั่ง
    return NextResponse.json({
      order: order,
      items: orderItems
    });

  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
