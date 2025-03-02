import { NextResponse } from "next/server";
import { getDBConnection } from "../../lib/db"; // Adjust the path as necessary

export async function POST(request) {
  let db;
  try {
    db = await getDBConnection();

    // Start a transaction
    await db.run("BEGIN");

    const requestBody = await request.json();
    const { user_email } = requestBody; // Assuming user_email is passed in the request body

    // Insert order
    const result = await db.run("INSERT INTO orders (user_email) VALUES (?)", [user_email]);

    // Get the ID of the last inserted row
    const orderId = result.lastID; // Assuming the orders table has an auto-incrementing primary key

    // Commit the transaction
    await db.run("COMMIT");

    return NextResponse.json({ orderId }, { status: 201 });

  } catch (error) {
    // Rollback the transaction if an error occurs
    if (db) await db.run("ROLLBACK");
    console.error("🔥 Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
