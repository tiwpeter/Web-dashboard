//http://localhost:3000/api/findcateprodcut?category_id=4
import { NextResponse } from 'next/server';
import { getDBConnection } from '../../../../lib/db';

export async function GET(req) {
  const db = await getDBConnection();
  
  // รับค่า category_id จาก query string
  const categoryId = req.nextUrl.searchParams.get('category_id'); 

  if (!categoryId) {
    return NextResponse.json({ error: 'category_id is required' }, { status: 400 });
  }

  try {
    // ค้นหาสินค้าทั้งหมดที่อยู่ใน category_id นั้น
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
