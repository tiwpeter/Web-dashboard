// /api/products/onSale.js
// สำหรับลดราคา
// /api/products/onSale.js
import { getDBConnection } from '../../../lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  let db;
  try {
    db = await getDBConnection();

    // เช็คสินค้าที่มีราคาส่วนลด (sale_percent > 0) และมี discount_end_time
    // ถ้าไม่มี time จะไม่แสดง
    const query = "SELECT * FROM products WHERE sale_percent > 0 AND discount_end_time IS NOT NULL";
    const products = await db.all(query); // ใช้ db.all() เพื่อดึงข้อมูลจากฐานข้อมูล

    if (products.length === 0) {
      return NextResponse.json({ error: 'No products with discount found' }, { status: 404 });
    }

    // ส่งข้อมูลสินค้าที่มีราคาส่วนลดในรูปแบบ JSON
    return NextResponse.json({ products }, { status: 200 });

  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Internal server error', details: error.message }, { status: 500 });
  } finally {
    if (db) {
    }
  }
}
