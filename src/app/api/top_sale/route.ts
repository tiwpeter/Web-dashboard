import { NextResponse } from 'next/server';
import { getDBConnection } from '../../lib/db'; // แก้ไขเส้นทางตามที่เก็บไฟล์

export async function GET() {
  const db = await getDBConnection();  // เชื่อมต่อกับ PostgreSQL database
  try {
    // ดึงสินค้าขายดีจาก order_items โดยไม่ใช้ตาราง orders
    const result = await db.query(`
      SELECT 
        oi.product_id,
        p.name AS product_name,
        SUM(oi.quantity) AS total_quantity,
        SUM(oi.price * oi.quantity) AS total_sales
      FROM 
        order_items oi
      JOIN 
        products p ON oi.product_id = p.id
      GROUP BY 
        oi.product_id, p.name
      ORDER BY 
        total_sales DESC
      LIMIT 10;
    `);

    // ส่งข้อมูลสินค้าขายดีในรูปแบบ JSON
    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    console.error("Error fetching top selling products:", error);
    return NextResponse.json({ error: 'Failed to fetch top selling products' }, { status: 500 });
  }
}
