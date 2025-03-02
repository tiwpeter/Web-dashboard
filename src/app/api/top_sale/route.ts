import { NextResponse } from 'next/server';
import { getDBConnection } from '../../lib/db';

export async function GET() {
  const db = await getDBConnection();
  try {
    const topSellingProducts = await db.all(`
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
    oi.product_id
ORDER BY 
    total_sales DESC
LIMIT 10;

    `);

    const response = NextResponse.json(topSellingProducts);
    return response;
  } catch (error) {
    console.error("Error fetching top selling products:", error);
    const response = NextResponse.json({ error: 'Failed to fetch top selling products' }, { status: 500 });
    return response;
  }
}
//ตาราง orders จะมีข้อมูลที่เกี่ยวข้องกับคำสั่งซื้อ (เช่น วันที่, การชำระเงิน, ที่อยู่การจัดส่ง) แต่จะไม่เก็บรายละเอียดสินค้าที่ขายในแต่ละคำสั่งซื้อ