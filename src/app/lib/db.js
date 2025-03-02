import { NextResponse } from 'next/server';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// ตัวแปรเพื่อเก็บการเชื่อมต่อฐานข้อมูล
let dbInstance;

// ฟังก์ชันสำหรับเชื่อมต่อฐานข้อมูล

/*
ใช้ category_id แทน category_name เพื่อการเชื่อมโยงที่ปลอดภัยกว่า.
ตรวจสอบการเปิดใช้งาน Foreign Key constraints ใน SQLite.
*/
// ฟังก์ชันสำหรับเชื่อมต่อฐานข้อมูล
export async function getDBConnection() {
  // ตรวจสอบว่ามีการเชื่อมต่อฐานข้อมูลแล้วหรือยัง
  if (!dbInstance) {
    // เปิดการเชื่อมต่อฐานข้อมูล
    dbInstance = await open({
      filename: './my-database.db',
      driver: sqlite3.Database,
    });

    // เปิด foreign key constraints
    await dbInstance.run('PRAGMA foreign_keys = ON;');
  }

  return dbInstance;
}