import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { getDBConnection } from '../../lib/db';

export async function GET() {
  try {
    const db = await getDBConnection();

    // Query ข้อมูลจากตารางที่ต้องการ
    const products = await db.all(`
      SELECT 
        p.id AS product_id,
        p.name AS product_name,
        p.price,
        p.category_id,
        p.sale_percent,
        p.discount_end_time,
        p.rating,
        p.sold,
        p.created_at,
        p.stock,
        c.name AS category_name,
        o.id AS option_id,
        o.option_type,
        o.option_name,
        o.option_price,
        o.image_url AS option_image_url,
        pi.image_url AS product_image_url
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN product_options po ON p.id = po.product_id
      LEFT JOIN options o ON po.option_id = o.id
      LEFT JOIN product_images pi ON p.id = pi.product_id
    `);

    console.log('📌 Data from DB:', products); // เช็คว่ามีข้อมูลหรือไม่

    if (!products || products.length === 0) {
      return NextResponse.json({ success: false, error: 'No data found' }, { status: 404 });
    }

    const filePath = path.join(process.cwd(), 'public', 'products.json');
    console.log(`📁 Saving file at: ${filePath}`);

    try {
      await fs.writeFile(filePath, JSON.stringify(products, null, 2), 'utf-8');
      console.log(`✅ Data successfully saved to: ${filePath}`);
    } catch (err) {
      console.error('❌ Error writing file:', err);
      return NextResponse.json({ success: false, error: 'Failed to save file' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Data saved to products.json' });

  } catch (error) {
    console.error('❌ Error fetching products:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
