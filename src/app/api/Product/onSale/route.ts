// /api/products/onSale.js
import { getDBConnection } from '../../../lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  let db;
  try {
    db = await getDBConnection();

    // ดึงสินค้าที่ลดราคาพร้อมรูปภาพ
    const query = `
      SELECT p.*, 
             GROUP_CONCAT(pi.image_url) AS image_urls
      FROM products p
      LEFT JOIN product_images pi ON p.id = pi.product_id
      WHERE p.sale_percent > 0
      GROUP BY p.id
    `;

    const products = await db.all(query);

    if (products.length === 0) {
      return NextResponse.json({ error: 'No products with discount found' }, { status: 404 });
    }

    // แปลง image_urls จาก string เป็น array
    const formattedProducts = products.map(product => ({
      ...product,
      image_urls: product.image_urls ? product.image_urls.split(',') : []
    }));

    return NextResponse.json({ products: formattedProducts }, { status: 200 });

  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Internal server error', details: error.message }, { status: 500 });
  } finally {
    if (db) {
    }
  }
}
