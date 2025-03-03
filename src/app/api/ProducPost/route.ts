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
      stock = 0,
      created_at = new Date().toISOString(),
      product_image_urls = [],
      options = [], // ตั้งค่า default เป็น empty array
    } = requestBody;

    if (!name || !price || !category_id) {
      console.error("❌ Invalid input data:", JSON.stringify({ name, price, sale_percent, category_id, sold, rating }, null, 2));
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    console.log("🛠 Options Structure:", JSON.stringify(options, null, 2));

    // Start transaction
    await db.run("BEGIN TRANSACTION");

    // Add product
    const result = await db.run(
      "INSERT INTO products (name, price, sale_percent, category_id, sold, rating, stock, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [name, price, sale_percent, category_id, sold, rating, stock, created_at]
    );
    const product_id = result.lastID;

    // Save images into `product_images` table
    for (const imageUrl of product_image_urls) {
      await db.run(
        "INSERT INTO product_images (product_id, image_url) VALUES (?, ?)",
        [product_id, imageUrl]
      );
    }

    // ตรวจสอบว่ามี options หรือไม่ ก่อนที่จะดำเนินการ
    if (Array.isArray(options) && options.length > 0) {
      for (const optionGroup of options) {
        console.log("🔹 Processing Option Group:", JSON.stringify(optionGroup, null, 2));
        const { option_type, options: subOptions } = optionGroup;

        if (!option_type || !Array.isArray(subOptions)) {
          throw new Error("Invalid option group data: option_type is required and subOptions must be an array");
        }

        for (const option of subOptions) {
          console.log("  - 🛠 Processing Sub Option:", JSON.stringify(option, null, 2));
          const { option_name, option_price, image_urls = [] } = option;

          if (!option_name || option_price === undefined) {
            throw new Error("Invalid option data: option_name and option_price are required");
          }

          // Check if the option already exists in the options table
          const existingOption = await db.get(
            "SELECT id FROM options WHERE option_name = ? AND option_price = ?",
            [option_name, option_price]
          );

          let option_id;

          if (existingOption) {
            console.log(`🔹 Option already exists, using existing ID: ${existingOption.id}`);
            option_id = existingOption.id;
          } else {
            // Add option if not exists
            const optionResult = await db.run(
              "INSERT INTO options (option_type, option_type_name, option_name, option_price, image_url) VALUES (?, ?, ?, ?, ?)",
              [option_type, option_type, option_name, option_price, image_urls.join(',')]
            );
            option_id = optionResult.lastID;
          }

          // Link product with the option
          await db.run(
            "INSERT INTO product_options (product_id, option_id) VALUES (?, ?)",
            [product_id, option_id]
          );
        }
      }
    } else {
      console.log("✅ No options provided, skipping option processing.");
    }

    // Commit transaction
    await db.run("COMMIT");

    return NextResponse.json({
      message: "Product added successfully",
      product_id,
    });
  } catch (error) {
    if (db) await db.run("ROLLBACK");
    console.error("🔥 Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
