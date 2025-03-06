import { NextResponse } from "next/server";
import { getDBConnection } from "../../lib/db"; // ปรับให้ใช้ PostgreSQL

// กำหนดประเภทสำหรับข้อมูลที่ดึงจากฐานข้อมูล
type SalesByCategory = {
  category_name: string;
  total_sales: number;
};

export async function GET() {
  const client = await getDBConnection(); // เชื่อมต่อกับฐานข้อมูล PostgreSQL
  try {
    // ดึงข้อมูลยอดขายตามหมวดหมู่สินค้า
    const result = await client.query<SalesByCategory>(`
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

    const salesByCategory: SalesByCategory[] = result.rows;

    // คำนวณยอดขายรวมทั้งหมด
    const totalSalesResult = await client.query(`
      SELECT SUM(quantity * price) AS total_sales
      FROM order_items
    `);

    const totalSales = totalSalesResult.rows[0].total_sales || 0;

    // คำนวณส่วนแบ่งยอดขายของแต่ละหมวดหมู่
    const salesShareByCategory = salesByCategory.map((category: SalesByCategory) => {
      const salesSharePercentage = totalSales ? (category.total_sales / totalSales) * 100 : 0;
      return {
        category_name: category.category_name,
        total_sales: category.total_sales,
        sales_share_percentage: salesSharePercentage.toFixed(2), // ส่วนแบ่งยอดขายเป็นเปอร์เซ็นต์
      };
    });

    // ส่งข้อมูลกลับในรูปแบบ JSON
    return NextResponse.json(salesShareByCategory);
  } catch (error) {
    console.error("Error fetching sales share by category:", error);
    return NextResponse.json(
      { error: "Failed to fetch sales share by category" },
      { status: 500 }
    );
  } finally {
    // ปิดการเชื่อมต่อฐานข้อมูลเมื่อเสร็จสิ้น
  }
}
