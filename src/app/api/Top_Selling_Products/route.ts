import { NextResponse } from 'next/server';
import { getDBConnection } from '../../lib/db';

export async function GET() {
  const db = await getDBConnection();
  try {
    // ดึงข้อมูลสินค้าที่ขายดีที่สุด โดยใช้ยอดขายรวม (ยอดขาย = ราคา * จำนวนที่ขาย)
    const topSellingProducts = await db.all(`
      SELECT 
          p.name AS product_name,
          SUM(oi.quantity) AS total_quantity,
          SUM(oi.quantity * oi.price) AS total_sales
      FROM 
          order_items oi
      JOIN 
          products p ON oi.product_id = p.id
      GROUP BY 
          oi.product_id
      ORDER BY 
          total_sales DESC
      LIMIT 10
    `);

    // ส่งข้อมูลสินค้าขายดีกลับในรูปแบบ JSON
    const response = NextResponse.json(topSellingProducts);
    return response;
  } catch (error) {
    console.error("Error fetching top selling products:", error);
    const response = NextResponse.json({ error: 'Failed to fetch top selling products' }, { status: 500 });
    return response;
  }
}
//ส่งข้อมูล 10 อันดับสินค้าขายดีที่สุดในรูปแบบ JSON เพื่อใช้แสดงผลบน Frontend