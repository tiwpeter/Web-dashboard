import { getDBConnection } from '../../../lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  let db;
  try {
    db = await getDBConnection();

    const query = "SELECT * FROM products WHERE sale_percent = 0 OR sale_percent IS NULL";
    const products = await db.all(query); // ใช้ db.all() แทน db.query()

    if (products.length === 0) {
      return NextResponse.json({ error: 'No products found' }, { status: 404 });
    }

    return NextResponse.json(products, { status: 200 });

  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Internal server error', details: error.message }, { status: 500 });
  } finally {
    if (db) {
    }
  }
}
