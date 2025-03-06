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
  const { id } = context.params; // ใช้ context.params เพื่อดึง `id` จาก URL

  try {
    // 1️⃣ ดึงข้อมูลสินค้า
    const productResult = await db.query("SELECT * FROM products WHERE id = $1", [id]);

    const product = productResult.rows[0]; // ใช้ rows[0] เพราะ query จะคืนค่าผลลัพธ์ในรูปแบบ array ของแถว

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // 2️⃣ ดึงข้อมูล category_name จากตาราง categories (ใช้ category_id ที่อยู่ใน product)
    const categoryResult = await db.query(
      "SELECT name FROM categories WHERE id = $1",
      [product.category_id]
    );

    const category = categoryResult.rows[0];

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    // 3️⃣ ดึงรูปภาพสินค้า
    const productImagesResult = await db.query(
      "SELECT image_url FROM product_images WHERE product_id = $1",
      [id]
    );
    const productImages: ProductImage[] = productImagesResult.rows;

    // 4️⃣ ดึงข้อมูลตัวเลือกสินค้าโดยตรงจาก options (ไม่ใช้ JOIN)
    const optionsResult = await db.query(
      `SELECT id, option_type_name, option_name, option_price, image_url 
       FROM options 
       WHERE id IN (SELECT option_id FROM product_options WHERE product_id = $1)`,
      [id]
    );

    const options: Option[] = optionsResult.rows;

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
