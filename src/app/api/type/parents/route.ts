import { NextResponse } from 'next/server'; // นำเข้า NextResponse
import { getDBConnection } from '../../../lib/db';

export async function POST(req) {
  const db = await getDBConnection();

  try {
    const body = await req.json();
    console.log("📥 Received JSON:", body); // แสดงข้อมูลที่ได้รับจาก request body

    if (!Array.isArray(body)) {
      return NextResponse.json({ error: 'Request body must be an array' }, { status: 400 });
    }

    const insertedData = [];

    for (const item of body) {
      const { parent_name, parent_image_url } = item;

      if (!parent_name) {
        return NextResponse.json({ error: 'parent_name is required' }, { status: 400 });
      }

      const result = await db.run(
        `INSERT INTO parents (parent_name, parent_image_url) VALUES (?, ?)`,
        [parent_name, parent_image_url || null]
      );

      insertedData.push({ id: result.lastID, parent_name, parent_image_url });
    }

    console.log("✅ Inserted Data:", insertedData); // แสดงข้อมูลที่บันทึก
    return NextResponse.json({ message: "✅ Data inserted successfully!", insertedData }, { status: 201 });
  } catch (error) {
    console.error("❌ Database error:", error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
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
