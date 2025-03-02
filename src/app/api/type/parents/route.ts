import { NextResponse } from 'next/server'; // นำเข้า NextResponse
import { getDBConnection } from '../../../lib/db';

export async function POST(req) {
  const db = await getDBConnection();
  const { parent_name, parent_image_url } = await req.json(); // รับข้อมูลจาก request body

  if (!parent_name) {
    return NextResponse.json({ error: 'parent_name is required' }, { status: 400 });
  }

  try {
    const result = await db.run(
      `INSERT INTO parents (parent_name, parent_image_url) VALUES (?, ?)`,
      [parent_name, parent_image_url || null] // ส่ง parent_name และ parent_image_url ถ้ามี
    );

    const response = NextResponse.json({ id: result.lastID, parent_name, parent_image_url }, { status: 201 });
    return response;
  } catch (error) {
    console.error("Database error:", error);
    const response = NextResponse.json({ error: 'Database error' }, { status: 500 });
    return response;
  }
}

// Handle GET requests for categories (Get all categories)
export async function GET() {
  const db = await getDBConnection();
  try {
    const categories = await db.all('SELECT * FROM parents');
    const response = NextResponse.json(categories);
    return response;
  } catch (error) {
    console.error("Error fetching categories:", error);
    const response = NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
    return response;
  }
}
