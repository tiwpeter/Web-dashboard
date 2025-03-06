import { NextRequest, NextResponse } from 'next/server';
import { getDBConnection } from '../../../lib/db';

export async function GET(req: NextRequest) {
  const db = await getDBConnection();
  
  // รับค่า category_id จาก query string
  const categoryId = req.nextUrl.searchParams.get('category_id'); 

  try {
    let products;

    if (!categoryId) {
      // ถ้าไม่มี category_id ให้ดึงสินค้าทั้งหมดพร้อมกับรูปภาพ
      const result = await db.query(
        `SELECT p.id, p.name, p.price, p.category_id, pi.image_url AS product_image
         FROM products p
         LEFT JOIN product_images pi ON p.id = pi.product_id;`
      );
      products = result.rows;
    } else {
      // ถ้ามี category_id ให้ค้นหาสินค้าตาม category_id พร้อมกับรูปภาพ
      const result = await db.query(
        `SELECT p.id, p.name, p.price, p.category_id, 
           (SELECT pi.image_url FROM product_images pi WHERE pi.product_id = p.id LIMIT 1) AS product_image
         FROM products p
         WHERE p.category_id = $1;`, 
        [categoryId]
      );
      products = result.rows;
    }

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
