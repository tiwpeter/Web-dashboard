import { NextResponse } from "next/server";
import { getDBConnection } from "../../../../lib/db";

export async function GET(req: Request) { // 🛠 เพิ่มประเภท `Request`
  const db = await getDBConnection();

  // ใช้ URL จาก req เพื่อดึง query parameters
  const url = new URL(req.url);
  const categoryId = url.searchParams.get("category_id");

  if (!categoryId) {
    // ถ้าไม่มี category_id ให้ดึงสินค้าทั้งหมดพร้อมกับรูปภาพ
    try {
      const products = await db.all(
        `SELECT p.id, p.name, p.price, p.category_id, pi.image_url AS product_image
         FROM products p
         LEFT JOIN product_images pi ON p.id = pi.product_id;`
      );
      return NextResponse.json(products, { status: 200 });
    } catch (error) {
      console.error("Database error:", error);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
  }

  // ถ้ามี category_id ให้ค้นหาสินค้าตาม category_id พร้อมกับรูปภาพ
  try {
    const products = await db.all(
      `SELECT p.id, p.name, p.price, p.category_id, 
         (SELECT pi.image_url FROM product_images pi WHERE pi.product_id = p.id LIMIT 1) AS product_image
       FROM products p
       WHERE p.category_id = ?;`,
      [categoryId]
    );

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
