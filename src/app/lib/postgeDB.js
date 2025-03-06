// lib/db.js
import { Pool } from 'pg';

// ตั้งค่าการเชื่อมต่อฐานข้อมูล PostgreSQL
const pool = new Pool({
  user: 'postgres',         // ชื่อผู้ใช้
  host: 'localhost',        // ที่อยู่เซิร์ฟเวอร์
  database: 'test',         // ชื่อฐานข้อมูล
  password: '123456',       // รหัสผ่าน
  port: 5432,               // พอร์ต PostgreSQL
});

// ฟังก์ชันในการเชื่อมต่อฐานข้อมูล
export async function getDBConnection(text, params) {
  const res = await pool.query(text, params);
  return res.rows;
}
