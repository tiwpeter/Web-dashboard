import { NextResponse } from "next/server";
import { getDBConnection } from "../../lib/db"; // แก้ path ตามจริง

interface Column {
  column_name: string;
}

interface TableColumns {
  [key: string]: string[];  // ใช้ key เป็นชื่อ table และค่าคือ array ของชื่อคอลัมน์
}

export async function GET() {
  try {
    const db = await getDBConnection();

    // ดึงข้อมูลตารางทั้งหมดในฐานข้อมูล
    const tablesResult = await db.query(
      `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';`
    );

    const tableColumns: TableColumns = {};

    // ตรวจสอบว่าได้ข้อมูลตารางหรือไม่
    if (tablesResult.rows.length > 0) {
      // ลูปผ่านทุกตาราง
      for (const table of tablesResult.rows) {
        const tableName = table.table_name;
        
        // ดึงคอลัมน์สำหรับตารางนั้น ๆ
        const columnsResult = await db.query(
          `SELECT column_name FROM information_schema.columns WHERE table_name = $1;`,
          [tableName]
        );

        // เก็บข้อมูลคอลัมน์ใน tableColumns
        if (columnsResult.rows.length > 0) {
          tableColumns[tableName] = columnsResult.rows.map((c: any) => c.column_name);
        }
      }

      // แสดงผลลัพธ์ของคอลัมน์จากทุกตาราง
      console.log('Table Columns:', tableColumns);  

      return NextResponse.json({ tables: tableColumns });
    } else {
      return NextResponse.json({ error: "No tables found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
