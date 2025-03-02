import { NextResponse } from "next/server";
import { getDBConnection } from "../../lib/db"; // แก้ path ตามจริง

export async function GET() {
  try {
    const db = await getDBConnection();

    // ดึงรายการตารางจากฐานข้อมูล
    const tables = await db.all(
      "SELECT name FROM sqlite_master WHERE type='table';"
    );

    // ดึงคอลัมน์สำหรับแต่ละตาราง
    const tableColumns = {};
    
    for (const table of tables) {
      const columns = await db.all(`PRAGMA table_info(${table.name});`);
      tableColumns[table.name] = columns.map(c => c.name);
    }

    return NextResponse.json({ tables: tableColumns });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
