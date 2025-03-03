import { NextResponse } from "next/server";
import { getDBConnection } from "../../lib/db";

export async function POST(request) {
  let db;
  try {
    db = await getDBConnection();
    const requestBody = await request.json();

    console.log("📥 Received Data:", JSON.stringify(requestBody, null, 2));

    const {
      name,
      price,
      sale_percent = 0,
      category_id,
      sold = 0,
      rating = 0,
      stock = 0,  // Assuming stock is needed as an example
      created_at = new Date().toISOString(),
      product_image_urls = [],
      options,
    } = requestBody;

    // ตรวจสอบข้อมูลที่จำเป็น
    if (!name || !price || !category_id || !Array.isArray(options)) {
      console.error(
        "❌ Invalid input data:",
        JSON.stringify(
          { name, price, sale_percent, category_id, sold, rating, options },
          null,
          2
        )
      );
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    // Process product image URLs and options
    const processedOptions = options.map(optionGroup => {
      return {
        option_type: optionGroup.option_type,
        options: optionGroup.options.map(option => ({
          option_name: option.option_name,
          option_price: option.option_price,
          image_urls: option.image_urls,
        }))
      };
    });

    // Insert product data into the database (Assuming you have a function for that)
    const result = await db.collection("products").insertOne({
      name,
      price,
      sale_percent,
      category_id,
      sold,
      rating,
      stock,
      created_at,
      product_image_urls,
      options: processedOptions,
    });

    console.log("🛠 Product inserted successfully:", result);
    return NextResponse.json({ success: true, result }, { status: 200 });
  } catch (error) {
    console.error("🔥 Error processing request:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  } finally {
    if (db) {
      db.close(); // Close DB connection if needed
    }
  }
}
