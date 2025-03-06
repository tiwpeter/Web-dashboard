import sqlite3
import json

# ฟังก์ชันสำหรับการแปลงข้อความ Unicode ให้เป็นข้อความที่อ่านได้
def decode_unicode(input_str):
    if isinstance(input_str, str):
        try:
            # แปลงเป็น utf-8 โดยตรง
            return input_str.encode('utf-8').decode('utf-8', errors='ignore')
        except UnicodeDecodeError:
            return input_str  # ถ้าแปลงไม่ได้ก็คืนค่าเดิม
    return input_str  # ถ้าไม่ใช่สตริงก็คืนค่าเดิม

# เชื่อมต่อกับฐานข้อมูล SQLite
conn = sqlite3.connect('my-database.db')
cursor = conn.cursor()

# ฟังก์ชันสำหรับดึงข้อมูลจากทุกตารางในฐานข้อมูล
def fetch_table_data():
    tables = {
        "options": ["id", "option_type", "option_name", "option_price", "image_url", "option_type_name"],
        "sqlite_sequence": ["name", "seq"],
        "product_options": ["id", "product_id", "option_id"],
        "parents": ["id", "parent_name", "parent_image_url"],
        "categories": ["id", "name", "parent_id"],
        "product_images": ["id", "product_id", "image_url"],
        "discounts": ["id", "product_id", "discount_percent", "discount_start_time", "discount_end_time"],
        "products": ["id", "name", "price", "category_id", "sale_percent", "discount_end_time", "rating", "sold", "stock", "created_at"],
        "option_images": ["id", "option_id", "image_url"],
        "orders": ["id", "user_email", "total_price", "shipping_address", "phone", "payment_id", "created_at", "payment_method"],
        "payments": ["id", "method"],
        "order_items": ["id", "order_id", "product_id", "name", "price", "quantity"],
        "visitors": ["id", "count"]
    }

    data = {}

    for table, columns in tables.items():
        query = f"SELECT {', '.join(columns)} FROM {table}"
        cursor.execute(query)
        rows = cursor.fetchall()

        # แปลงข้อมูลเป็น dictionary (key คือ ชื่อคอลัมน์) และแปลงข้อความเป็นภาษาไทย
        rows_data = []
        for row in rows:
            row_dict = dict(zip(columns, row))
            # แปลงข้อความที่เป็น Unicode ให้เป็นภาษาไทย
            for key, value in row_dict.items():
                row_dict[key] = decode_unicode(value)
            rows_data.append(row_dict)
        data[table] = rows_data

    return data

# ดึงข้อมูลจากทุกตาราง
table_data = fetch_table_data()

# บันทึกข้อมูลลงในไฟล์ JSON
with open('output.json', 'w', encoding='utf-8') as json_file:
    json.dump(table_data, json_file, indent=4, ensure_ascii=False)

# ปิดการเชื่อมต่อ
conn.close()
