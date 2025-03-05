import { NextResponse } from "next/server";
import { getDBConnection } from "../../lib/db"; // แก้ path ตามจริง

interface Column {
  name: string;
}

interface Table {
  name: string;
}

interface TableColumns {
  [key: string]: string[];  // ใช้ key เป็นชื่อ table และค่าคือ array ของชื่อคอลัมน์
}

export async function GET() {
  try {
    const db = await getDBConnection();

    // ดึงรายการตารางจากฐานข้อมูล
    const tables: Table[] = await db.all(
      "SELECT name FROM sqlite_master WHERE type='table';"
    );

    // ดึงคอลัมน์สำหรับแต่ละตาราง
    const tableColumns: TableColumns = {};  // กำหนดประเภทให้ tableColumns

    for (const table of tables) {
      const columns: Column[] = await db.all(`PRAGMA table_info(${table.name});`);
      tableColumns[table.name] = columns.map(c => c.name);
    }

    return NextResponse.json({ tables: tableColumns });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
