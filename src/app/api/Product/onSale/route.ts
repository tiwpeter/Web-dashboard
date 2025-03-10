import { getDBConnection } from "../../../lib/db";
import { NextResponse } from "next/server";

// กำหนด Type สำหรับ Product
type Product = {
  id: number;
  name: string;
  price: number;
  category_id: number;
  sale_percent: number;
  image_urls?: string; // อาจเป็น string หรือ undefined (STRING_AGG)
};

export async function GET() {
  try {
    const db = await getDBConnection();

    // ดึงสินค้าที่ลดราคาพร้อมรูปภาพ (ใช้ STRING_AGG แทน GROUP_CONCAT)
    const query = `
      SELECT p.*, 
             STRING_AGG(pi.image_url, ',') AS image_urls
      FROM products p
      LEFT JOIN product_images pi ON p.id = pi.product_id
      WHERE p.sale_percent > 0
      GROUP BY p.id
    `;

    const result = await db.query(query);
    const products: Product[] = result.rows; // ใช้ rows แทน

    if (!products || products.length === 0) {
      return NextResponse.json({ error: "No products with discount found" }, { status: 404 });
    }

    // แปลง image_urls จาก string เป็น array
    const formattedProducts = products.map((product: Product) => ({
      ...product,
      image_urls: product.image_urls ? product.image_urls.split(",") : [],
    }));

    return NextResponse.json({ products: formattedProducts }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
