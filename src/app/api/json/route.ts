import { getDBConnection } from "../../lib/db";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const db = await getDBConnection();

    // Query to join the tables and fetch product data with related information
    const products = await db.all(`
      SELECT 
        p.id AS product_id,
        p.name AS product_name,
        p.price,
        p.category_id,
        p.sale_percent,
        p.discount_end_time,
        p.rating,
        p.sold,
        p.stock,
        p.created_at,
        c.name AS category_name,
        c.parent_id AS category_parent_id,
        pi.image_url AS product_image_url,
        o.id AS option_id,
        o.option_type,
        o.option_name,
        o.option_price,
        oi.image_url AS option_image_url
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN product_images pi ON p.id = pi.product_id
      LEFT JOIN product_options po ON p.id = po.product_id
      LEFT JOIN options o ON po.option_id = o.id
      LEFT JOIN option_images oi ON o.id = oi.option_id
    `);

    // Group the products by category and include their options and images
    const groupedProducts = products.reduce((acc, product) => {
      const category = product.category_name;

      if (!acc[category]) {
        acc[category] = [];
      }

      // Find existing product in the category
      const existingProduct = acc[category].find(p => p.product_id === product.product_id);
      if (existingProduct) {
        // Add option and image details to the existing product
        if (product.option_id) {
          existingProduct.options.push({
            option_id: product.option_id,
            option_type: product.option_type,
            option_name: product.option_name,
            option_price: product.option_price,
            option_image_url: product.option_image_url,
          });
        }

        // Add product images
        if (product.product_image_url && !existingProduct.product_images.includes(product.product_image_url)) {
          existingProduct.product_images.push(product.product_image_url);
        }
      } else {
        // Create a new product entry
        acc[category].push({
          product_id: product.product_id,
          product_name: product.product_name,
          price: product.price,
          sale_percent: product.sale_percent,
          discount_end_time: product.discount_end_time,
          rating: product.rating,
          sold: product.sold,
          stock: product.stock,
          created_at: product.created_at,
          category_name: product.category_name,
          product_images: product.product_image_url ? [product.product_image_url] : [],
          options: product.option_id ? [{
            option_id: product.option_id,
            option_type: product.option_type,
            option_name: product.option_name,
            option_price: product.option_price,
            option_image_url: product.option_image_url,
          }] : []
        });
      }

      return acc;
    }, {});

    // Convert the grouped data into an array of categories with products
    const finalProducts = Object.values(groupedProducts);

    // Create a file path where the JSON will be saved
    const filePath = path.join(process.cwd(), "products_data.json");

    // Write the data into a JSON file
    fs.writeFileSync(filePath, JSON.stringify(finalProducts, null, 2));

    return new Response("Data has been saved to products_data.json", { status: 200 });

  } catch (error) {
    console.error('Error fetching products:', error);
    return new Response('Internal server error', { status: 500 });
  }
}
