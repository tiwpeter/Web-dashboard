import { NextResponse } from 'next/server';
import { getDBConnection } from '../../../lib/db';

export async function GET(req) {
  const db = await getDBConnection();
  
  // รับค่า category_id จาก query string
  const categoryId = req.nextUrl.searchParams.get('category_id'); 

  if (!categoryId) {
    // ถ้าไม่มี category_id ให้ดึงสินค้าทั้งหมด
    try {
      const products = await db.all(
        `SELECT id, name, price, category_id FROM products;`
      );
      return NextResponse.json(products, { status: 200 });
    } catch (error) {
      console.error("Database error:", error);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
  }

  // ถ้ามี category_id ให้ค้นหาสินค้าตาม category_id
  try {
    const products = await db.all(
      `SELECT id, name, price, category_id FROM products WHERE category_id = ?;`, 
      [categoryId]
    );

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
