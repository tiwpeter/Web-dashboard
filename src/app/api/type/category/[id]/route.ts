// app/api/type/category/[id]/route.js
import { NextResponse } from 'next/server';
import { getDBConnection } from '../../../../lib/db';

export async function GET(req, { params }) {
  const { id } = params; // รับค่า category_id จาก params
  
  if (!id) {
    return NextResponse.json({ error: "category_id is required" }, { status: 400 });
  }

  try {
    const db = await getDBConnection();
    const category = await db.get(
      `SELECT c.id, c.name AS category_name, p.parent_name AS parent_category
       FROM categories c
       LEFT JOIN parents p ON c.parent_id = p.id
       WHERE c.id = ?;`,
      [id]
    );

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    return NextResponse.json({
      category_name: category.category_name,
      parent_category: category.parent_category,
    }, { status: 200 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
