import { NextRequest, NextResponse } from 'next/server';
import { getDBConnection } from '../../../lib/db';

// Handle GET requests for categories (Get all categories)
export async function GET(req) {
  const db = await getDBConnection();

  try {
    // ดึงข้อมูลหมวดหมู่ทั้งหมดจากตาราง categories พร้อม parent_name จาก parents
    const categories = await db.all(`
      SELECT c.id, c.name AS category_name, c.parent_id
      FROM categories c
    `);
    
    // ส่งข้อมูลกลับเป็น JSON ที่มีฟิลด์ id, category_name, และ parent_id
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}

// Handle POST requests for creating a new category
export async function POST(req) {
  const db = await getDBConnection();
  const { category_name, parent_id } = await req.json();

  // ตรวจสอบว่ามีการส่ง category_name และ parent_id มาหรือไม่
  if (!category_name || !parent_id) {
    return NextResponse.json({ error: 'category_name and parent_id are required' }, { status: 400 });
  }

  try {
    // ทำการเพิ่มหมวดหมู่ใหม่ลงในตาราง categories
    const result = await db.run(
      `INSERT INTO categories (name, parent_id) VALUES (?, ?)`,
      [category_name, parent_id]
    );

    // ส่งกลับข้อมูลที่เพิ่มใหม่ รวมทั้ง id, category_name และ parent_id
    return NextResponse.json({ id: result.lastID, category_name, parent_id }, { status: 201 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
