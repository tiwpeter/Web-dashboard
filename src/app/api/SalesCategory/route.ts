import { NextResponse } from 'next/server';
import { getDBConnection } from '../../lib/db';

export async function GET() {
  const db = await getDBConnection();
  try {
    // ดึงข้อมูลยอดขายตามหมวดหมู่สินค้า
    const salesByCategory = await db.all(`
      SELECT 
          c.name AS category_name,
          SUM(oi.quantity * oi.price) AS total_sales
      FROM 
          order_items oi
      JOIN 
          products p ON oi.product_id = p.id
      JOIN 
          categories c ON p.category_id = c.id
      GROUP BY 
          c.id
    `);

    // คำนวณยอดขายรวมทั้งหมด
    const totalSalesResult = await db.get(`
      SELECT SUM(quantity * price) AS total_sales
      FROM order_items
    `);

    const totalSales = totalSalesResult.total_sales || 0;

    // คำนวณส่วนแบ่งยอดขายของแต่ละหมวดหมู่
    const salesShareByCategory = salesByCategory.map((category) => {
      const salesSharePercentage = totalSales ? (category.total_sales / totalSales) * 100 : 0;
      return {
        category_name: category.category_name,
        total_sales: category.total_sales,
        sales_share_percentage: salesSharePercentage.toFixed(2)  // ส่วนแบ่งยอดขายเป็นเปอร์เซ็นต์
      };
    });

    // ส่งข้อมูลกลับในรูปแบบ JSON
    const response = NextResponse.json(salesShareByCategory);
    return response;
  } catch (error) {
    console.error("Error fetching sales share by category:", error);
    const response = NextResponse.json({ error: 'Failed to fetch sales share by category' }, { status: 500 });
    return response;
  }
}
//sales_share_percentage