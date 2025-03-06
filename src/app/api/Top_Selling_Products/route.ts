import { NextResponse } from 'next/server';
import { getDBConnection } from '../../lib/db';  // ให้แก้ไข path ตามที่เก็บไฟล์จริง

export async function GET() {
  const db = await getDBConnection();  // เชื่อมต่อกับ PostgreSQL database
  try {
    // ดึงข้อมูลสินค้าที่ขายดีที่สุด โดยใช้ยอดขายรวม (ยอดขาย = ราคา * จำนวนที่ขาย)
    const result = await db.query(`
      SELECT 
          p.name AS product_name,
          SUM(oi.quantity) AS total_quantity,
          SUM(oi.quantity * oi.price) AS total_sales
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
