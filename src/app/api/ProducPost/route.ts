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
      stock = 0,  // Add stock field
      created_at = new Date().toISOString(),  // Set created_at to current timestamp
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

    console.log("🛠 Options Structure:", JSON.stringify(options, null, 2));

    // ✅ เริ่ม transaction
    await db.run("BEGIN TRANSACTION");

    // ✅ เพิ่ม product (Include stock and created_at)
    const result = await db.run(
      "INSERT INTO products (name, price, sale_percent, category_id, sold, rating, stock, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [name, price, sale_percent, category_id, sold, rating, stock, created_at]
    );
    const product_id = result.lastID;

    // ✅ บันทึกภาพหลักลงตาราง `product_images`
    for (const imageUrl of product_image_urls) {
      await db.run(
        "INSERT INTO product_images (product_id, image_url) VALUES (?, ?)",
        [product_id, imageUrl]
      );
    }

    // ✅ Loop ผ่าน options
    for (const optionGroup of options) {
      console.log(
        "🔹 Processing Option Group:",
        JSON.stringify(optionGroup, null, 2)
      );
      const { option_type, options: subOptions } = optionGroup;

      // ตรวจสอบว่า option_type และ subOptions ถูกต้อง
      if (!option_type || !Array.isArray(subOptions)) {
        throw new Error("Invalid option group data: option_type is required and subOptions must be an array");
      }

      // ✅ Loop ผ่าน options แต่ละตัวในกลุ่ม
      for (const option of subOptions) {
        console.log(
          "  - 🛠 Processing Sub Option:",
          JSON.stringify(option, null, 2)
        );
        const { option_name, option_price, image_urls = [] } = option;

        // ตรวจสอบข้อมูลของตัวเลือก
        if (!option_name || option_price === undefined) {
          throw new Error("Invalid option data: option_name and option_price are required");
        }

        // ✅ เพิ่ม option ลงในตาราง options
        const optionResult = await db.run(
          "INSERT INTO options (option_type, option_type_name, option_name, option_price) VALUES (?, ?, ?, ?)",
          [option_type, option_type, option_name, option_price]
        );
        const option_id = optionResult.lastID;

        // ✅ เชื่อมโยง product กับ option
        await db.run(
          "INSERT INTO product_options (product_id, option_id) VALUES (?, ?)",
          [product_id, option_id]
        );

        // ✅ บันทึก `image_url` ลงใน options
        for (const imageUrl of image_urls) {
          await db.run(
            "INSERT INTO option_images (option_id, image_url) VALUES (?, ?)",
            [option_id, imageUrl]
          );
        }
      }
    }

    // ✅ Commit transaction
    await db.run("COMMIT");

    return NextResponse.json({
      message: "Product and options added successfully",
      product_id,
    });
  } catch (error) {
    if (db) await db.run("ROLLBACK");
    console.error("🔥 Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
