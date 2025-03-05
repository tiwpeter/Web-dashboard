import { NextRequest, NextResponse } from 'next/server'; // Import NextRequest
import { getDBConnection } from '../../../../lib/db';

interface Params {
  id: string; // Define the type of the `id` parameter (assuming it’s a string)
}

export async function GET(request : Request, context:any) {
  const { id } = context; // Access the category_id from params
  
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
