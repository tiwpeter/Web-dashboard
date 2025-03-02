import { NextResponse } from "next/server";
import { getDBConnection } from "../../../lib/db";

export async function GET(request, { params }) {
  const db = await getDBConnection();
  const { id } = params; // รับ product ID จาก URL

  try {
    // 1️⃣ ดึงข้อมูลสินค้า
    const product = await db.get("SELECT * FROM products WHERE id = ?", [id]);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // 2️⃣ ดึงรูปภาพสินค้า
    const productImages = await db.all(
      "SELECT image_url FROM product_images WHERE product_id = ?",
      [id]
    );

    // 3️⃣ ดึงข้อมูลตัวเลือกสินค้าโดยตรงจาก options (ไม่ใช้ JOIN)
    const options = await db.all(
      `SELECT id, option_type_name, option_name, option_price, image_url 
       FROM options 
       WHERE id IN (SELECT option_id FROM product_options WHERE product_id = ?)`,
      [id]
    );

    // 4️⃣ จัดกลุ่มตัวเลือกสินค้า (option_type_name) และจัดการข้อมูลตัวเลือก
    // 4️⃣ จัดกลุ่มตัวเลือกสินค้า (option_type_name) และจัดการข้อมูลตัวเลือก
const optionsGrouped = options.reduce((acc, opt) => {
  const { option_type_name, option_name, option_price, image_url } = opt;

  if (!acc[option_type_name]) {
    acc[option_type_name] = {
      option_type: option_type_name, // เก็บชื่อ option_type
      options: [],
    };
  }

  // Check if image_url exists and add it to the option
  acc[option_type_name].options.push({
    option_name: option_name, // เก็บชื่อ option_name
    option_price: option_price, // เก็บราคา option_price
    image_urls: image_url ? [image_url] : [], // เก็บ image_url ถ้ามี
  });
  return acc;
}, {});


    // 5️⃣ รวมข้อมูลทั้งหมด
    const productData = {
      ...product,
      images: productImages.map((img) => img.image_url), // แปลง array ของ image_url
      options: Object.values(optionsGrouped), // แปลง Object เป็น Array
    };

    return NextResponse.json(productData, { status: 200 });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
