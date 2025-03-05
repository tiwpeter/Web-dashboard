import { getDBConnection } from "../../../lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = await getDBConnection();

    const query = "SELECT * FROM products WHERE sale_percent = 0 OR sale_percent IS NULL";
    const products = await db.all(query);

    if (!products || products.length === 0) {
      return NextResponse.json({ error: "No products found" }, { status: 404 });
    }

    return NextResponse.json(products, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
