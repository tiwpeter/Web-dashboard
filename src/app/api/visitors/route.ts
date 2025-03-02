import { NextResponse } from 'next/server';
import { getDBConnection } from '../../lib/db';

// 📌 เพิ่มจำนวนผู้เข้าชม (POST)
export async function POST() {
  const db = await getDBConnection();
  try {
    // ดึงค่าปัจจุบัน
    const row = await db.get("SELECT count FROM visitors WHERE id = 1");
    const newCount = row ? row.count + 1 : 1;

    // อัปเดตหรือลงข้อมูลใหม่
    if (row) {
      await db.run("UPDATE visitors SET count = ? WHERE id = 1", newCount);
    } else {
      await db.run("INSERT INTO visitors (count) VALUES (?)", newCount);
    }

    return NextResponse.json({ count: newCount }, { status: 201 });
  } catch (error) {
    console.error("❌ Database error:", error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}

// 📌 ดึงจำนวนผู้เข้าชมปัจจุบัน (GET)
export async function GET() {
  const db = await getDBConnection();
  try {
    const row = await db.get("SELECT count FROM visitors WHERE id = 1");
    return NextResponse.json({ count: row ? row.count : 0 });
  } catch (error) {
    console.error("❌ Database error:", error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
