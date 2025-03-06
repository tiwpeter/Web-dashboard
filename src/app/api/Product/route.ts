import { NextResponse } from 'next/server';
import { getDBConnection } from '../../lib/db';

// Define types for the product and grouped product
type Product = {
  product_id: number;
  product_name: string;
  price: number;
  category_id: number;
  sale_percent: number | null;
  discount_end_time: string | null;
  rating: number;
  sold: number;
  created_at: string;
  stock: number;
  category_name: string;
  option_id: number | null;
  option_type: string | null;
  option_name: string | null;
  option_price: number | null;
  option_image_url: string | null;
  product_image_url: string | null;
};

type GroupedProduct = {
  product_id: number;
  product_name: string;
  price: number;
  sale_percent: number | null;
  discount_end_time: string | null;
  rating: number;
  sold: number;
  created_at: string;
  stock: number;
  category_name: string;
  options: Array<{
    option_id: number;
    option_type: string;
    option_name: string;
    option_price: number;
    image_url: string | null;
  }>;
  product_images: string[];
};

export async function GET() {
  try {
    const db = await getDBConnection();

    // Query to join products, product_options, product_images, and categories, and add created_at and stock
    const result = await db.query(`
      SELECT 
        p.id AS product_id,
        p.name AS product_name,
        p.price,
        p.category_id,
        p.sale_percent,
        p.discount_end_time,
        p.rating,
        p.sold,
        p.created_at,
        p.stock,
        c.name AS category_name,
        o.id AS option_id,
        o.option_type,
        o.option_name,
        o.option_price,
        o.image_url AS option_image_url,
        pi.image_url AS product_image_url
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN product_options po ON p.id = po.product_id
      LEFT JOIN options o ON po.option_id = o.id
      LEFT JOIN product_images pi ON p.id = pi.product_id
    `);

    // Assuming result.rows contains the data
    const products: Product[] = result.rows;

    // Grouping logic by category
    const groupedProducts = products.reduce((acc: { [key: string]: GroupedProduct[] }, product) => {
      const category = product.category_name; // Adjusted to use category_name
      if (!acc[category]) {
        acc[category] = [];
      }

      // Add option and image details to the product
      const existingProduct = acc[category].find(p => p.product_id === product.product_id);
      if (existingProduct) {
        // Add options to existing product
        if (product.option_id) {
          existingProduct.options.push({
            option_id: product.option_id,
            option_type: product.option_type || '',
            option_name: product.option_name || '',
            option_price: product.option_price || 0,
            image_url: product.option_image_url || ''
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
          created_at: product.created_at,  // Added created_at
          stock: product.stock,            // Added stock
          category_name: product.category_name,
          options: product.option_id ? [{
            option_id: product.option_id,
            option_type: product.option_type || '',
            option_name: product.option_name || '',
            option_price: product.option_price || 0,
            image_url: product.option_image_url || ''
          }] : [],
          product_images: product.product_image_url ? [product.product_image_url] : []
        });
      }

      return acc;
    }, {});

    // Convert the grouped data into an array of categories with products
    const finalProducts = Object.values(groupedProducts);

    return NextResponse.json(finalProducts, { status: 200 });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
