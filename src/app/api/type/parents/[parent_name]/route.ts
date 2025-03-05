import { NextRequest, NextResponse } from "next/server";
import { getDBConnection } from '../../../../lib/db';

// Define the type for the params object
type Params = {
  parent_name: string;
};

// Define the type for a Category
type Category = {
  id: number;
  category_name: string;
  parent_category: string | null;
};

export async function GET(request : Request, context:any) {

  const db = await getDBConnection();
  const { parent_name } = context;

  try {
    const categories: Category[] = await db.all(
      `SELECT c.id, c.name AS category_name, p.parent_name AS parent_category
       FROM categories c
       LEFT JOIN parents p ON c.parent_id = p.id
       WHERE p.parent_name = ?;`,
      [parent_name]
    );

    if (categories.length === 0) {
      return NextResponse.json({ error: "No categories found" }, { status: 404 });
    }

    const categoryIds = categories.map((c: Category) => c.id);  // Specify the type of 'c'
    const placeholders = categoryIds.map(() => "?").join(",");

    const products =
      categoryIds.length > 0
        ? await db.all(
            `SELECT p.id, p.name, p.price, p.category_id,
                    (SELECT pi.image_url FROM product_images pi WHERE pi.product_id = p.id LIMIT 1) AS product_image
             FROM products p
             WHERE p.category_id IN (${placeholders});`,
            categoryIds
          )
        : [];

    return NextResponse.json({ parent_name, categories, products }, { status: 200 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
