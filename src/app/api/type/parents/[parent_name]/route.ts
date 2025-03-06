import { NextRequest, NextResponse } from "next/server";
import { getDBConnection } from "../../../../lib/db";

// Define the type for a Category
type Category = {
  id: number;
  category_name: string;
  parent_category: string | null;
};

export async function GET(req: NextRequest, context: { params: { parent_name: string } }) {
  const db = await getDBConnection();
  const { parent_name } = context.params; // ใช้ `context.params` แทน `contexts`

  try {
    const categoriesResult = await db.query(
      `SELECT c.id, c.name AS category_name, p.parent_name AS parent_category
       FROM categories c
       LEFT JOIN parents p ON c.parent_id = p.id
       WHERE p.parent_name = $1;`,
      [parent_name]
    );

    const categories: Category[] = categoriesResult.rows;

    if (categories.length === 0) {
      return NextResponse.json({ error: "No categories found" }, { status: 404 });
    }

    const categoryIds = categories.map((c: Category) => c.id);

    let products = [];
    if (categoryIds.length > 0) {
      const placeholders = categoryIds.map((_, index) => `$${index + 1}`).join(",");

      const productsResult = await db.query(
        `SELECT p.id, p.name, p.price, p.category_id,
                (SELECT pi.image_url FROM product_images pi WHERE pi.product_id = p.id LIMIT 1) AS product_image
         FROM products p
         WHERE p.category_id IN (${placeholders});`,
        categoryIds
      );

      products = productsResult.rows;
    }

    return NextResponse.json({ parent_name, categories, products }, { status: 200 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
