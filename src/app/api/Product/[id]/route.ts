import { NextRequest, NextResponse } from "next/server";
import { getDBConnection } from "../../../lib/db";

export async function GET(request: NextRequest, context: { params: { id: string } }) {
  const db = await getDBConnection();
  const { id } = context.params; // Destructure 'id' from the context.params

  try {
    // 1️⃣ Fetch product data
    const product = await db.get("SELECT * FROM products WHERE id = ?", [id]);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // 2️⃣ Fetch category name
    const category = await db.get(
      "SELECT name FROM categories WHERE id = ?",
      [product.category_id]
    );

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    // 3️⃣ Fetch product images
    const productImages = await db.all(
      "SELECT image_url FROM product_images WHERE product_id = ?",
      [id]
    );

    // 4️⃣ Fetch product options
    const options = await db.all(
      `SELECT id, option_type_name, option_name, option_price, image_url 
       FROM options 
       WHERE id IN (SELECT option_id FROM product_options WHERE product_id = ?);`,
      [id]
    );

    // 5️⃣ Group product options
    const optionsGrouped = options.reduce((acc: any, opt: any) => {
      const { option_type_name, option_name, option_price, image_url } = opt;

      if (!acc[option_type_name]) {
        acc[option_type_name] = {
          option_type: option_type_name,
          options: [],
        };
      }

      acc[option_type_name].options.push({
        option_name,
        option_price,
        image_urls: image_url ? [image_url] : [],
      });

      return acc;
    }, {});

    // 6️⃣ Combine all data into productData
    const productData = {
      ...product,
      category_name: category.name,
      images: productImages.map((img: any) => img.image_url),
      options: Object.values(optionsGrouped),
    };

    return NextResponse.json(productData, { status: 200 });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
