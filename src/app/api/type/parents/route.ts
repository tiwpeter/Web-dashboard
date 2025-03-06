import { NextResponse, NextRequest } from "next/server";
import { getDBConnection } from "../../../lib/db";

export async function POST(req: NextRequest) {
  const db = await getDBConnection();

  try {
    const body = await req.json();
    console.log("📥 Received JSON:", body);

    if (!Array.isArray(body)) {
      return NextResponse.json({ error: "Request body must be an array" }, { status: 400 });
    }

    const insertedData = [];

    for (const item of body) {
      const { parent_name, parent_image_url } = item;

      if (!parent_name) {
        return NextResponse.json({ error: "parent_name is required" }, { status: 400 });
      }

      const result = await db.query(
        `INSERT INTO parents (parent_name, parent_image_url) 
         VALUES ($1, $2) RETURNING id, parent_name, parent_image_url`,
        [parent_name, parent_image_url || null]
      );

      insertedData.push(result.rows[0]); // PostgreSQL ใช้ result.rows
    }

    console.log("✅ Inserted Data:", insertedData);
    return NextResponse.json({ message: "✅ Data inserted successfully!", insertedData }, { status: 201 });
  } catch (error) {
    console.error("❌ Database error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

// Handle GET requests for parents (Get all parents)
export async function GET() {
  const db = await getDBConnection();
  try {
    const result = await db.query("SELECT * FROM parents");
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}
