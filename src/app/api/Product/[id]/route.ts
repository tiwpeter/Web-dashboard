import { NextResponse } from "next/server";
import { getDBConnection } from "../../../lib/db";

type Option = {
  id: number;
  option_type_name: string;
  option_name: string;
  option_price: number;
  image_url: string | null;
};

type GroupedOption = {
  option_type: string;
  options: {
    option_name: string;
    option_price: number;
    image_urls: string[];
  }[];
};

type ProductImage = {
  image_url: string;
};

export async function GET(request: Request, context: any) {
  const db = await getDBConnection();
  const { id } = await context; // เพิ่ม await ที่นี่

  try {
    // 1️⃣ ดึงข้อมูลสินค้า
    const product = await db.get("SELECT * FROM products WHERE id = ?", [id]);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // 2️⃣ ดึงข้อมูล category_name จากตาราง categories (ใช้ category_id ที่อยู่ใน product)
    const category = await db.get(
      "SELECT name FROM categories WHERE id = ?",
      [product.category_id]
    );

    // ถ้าไม่พบ category ให้คืน error
    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    // 3️⃣ ดึงรูปภาพสินค้า
    const productImages: ProductImage[] = await db.all(
      "SELECT image_url FROM product_images WHERE product_id = ?",
      [id]
    );

    // 4️⃣ ดึงข้อมูลตัวเลือกสินค้าโดยตรงจาก options (ไม่ใช้ JOIN)
    const options: Option[] = await db.all(
      `SELECT id, option_type_name, option_name, option_price, image_url 
       FROM options 
       WHERE id IN (SELECT option_id FROM product_options WHERE product_id = ?)`,

      [id]
    );

    // 5️⃣ จัดกลุ่มตัวเลือกสินค้า (option_type_name) และจัดการข้อมูลตัวเลือก
    const optionsGrouped = options.reduce((acc: { [key: string]: GroupedOption }, opt) => {
      const { option_type_name, option_name, option_price, image_url } = opt;

      if (!acc[option_type_name]) {
        acc[option_type_name] = {
          option_type: option_type_name,
          options: [],
        };
      }

      acc[option_type_name].options.push({
        option_name: option_name,
        option_price: option_price,
        image_urls: image_url ? [image_url] : [],
      });

      return acc;
    }, {});

    // 6️⃣ รวมข้อมูลทั้งหมด
    const productData = {
      ...product,
      category_name: category.name, // ใช้ category.name แทน category_name
      images: productImages.map((img) => img.image_url),
      options: Object.values(optionsGrouped),
    };

    return NextResponse.json(productData, { status: 200 });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
