// parent with cate
import { NextRequest, NextResponse } from 'next/server';
import { getDBConnection } from '../../../../lib/db';

export async function GET(req) {
  const db = await getDBConnection();
  
  // รับค่า parentCategory จาก query string
  const parentCategory = req.nextUrl.searchParams.get('parentCategory'); 

  if (!parentCategory) {
    return NextResponse.json({ error: 'parentCategory is required' }, { status: 400 });
  }

  try {
    // ค้นหาหมวดหมู่ย่อยที่เกี่ยวข้องกับหมวดหมู่หลัก
    const subCategories = await db.all(`
      SELECT id, name 
      FROM categories 
      WHERE parent_id = (SELECT id FROM parents WHERE parent_name = ?);
    `, [parentCategory]);

    // ส่งข้อมูลหมวดหมู่ย่อยกลับไป
    return NextResponse.json(subCategories, { status: 200 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
