import { NextResponse } from "next/server";
import { getDBConnection } from "../../lib/db"; // ปรับให้ใช้ PostgreSQL

// กำหนดประเภทของ timePeriod
type TimePeriod = "day" | "week" | "month";

export async function GET(request: Request) {
  try {
    const client = await getDBConnection(); // เชื่อมต่อกับฐานข้อมูล PostgreSQL

    // Query to calculate revenue and total_sale
    const responseOrders = await client.query(`
      SELECT
        o.created_at AS order_date,
        SUM(o.total_price) AS revenue,
        SUM(oi.quantity) AS total_sale
      FROM
        orders o
      JOIN
        order_items oi ON o.id = oi.order_id
      GROUP BY
        o.created_at
      ORDER BY
        o.created_at DESC;
    `);

    return NextResponse.json(responseOrders.rows, { status: 200 });
  } catch (error) {
    console.error("🔥 Error:", error);
    return NextResponse.json({}, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const client = await getDBConnection(); // เชื่อมต่อกับฐานข้อมูล PostgreSQL
    const { timePeriod }: { timePeriod: TimePeriod } = await request.json(); // รับค่า timePeriod จาก body

    let groupByClause = "";
    let orderByClause = "o.created_at DESC";

    // กำหนดเงื่อนไข GROUP BY ตามช่วงเวลา
    if (timePeriod === "day") {
      groupByClause = "DATE(o.created_at)"; // Group by day
    } else if (timePeriod === "week") {
      groupByClause = "DATE_TRUNC('week', o.created_at)"; // Group by week (PostgreSQL)
    } else if (timePeriod === "month") {
      groupByClause = "DATE_TRUNC('month', o.created_at)"; // Group by month (PostgreSQL)
    } else {
      return NextResponse.json({ error: "Invalid time period" }, { status: 400 });
    }

    // Query SQL for PostgreSQL
    const responseOrders = await client.query(`
      SELECT
        ${groupByClause} AS order_date,
        SUM(o.total_price) AS revenue,
        SUM(oi.quantity) AS total_sale
      FROM
        orders o
      JOIN
        order_items oi ON o.id = oi.order_id
      GROUP BY
        ${groupByClause}
      ORDER BY
        ${orderByClause};
    `);

    return NextResponse.json(responseOrders.rows, { status: 200 });
  } catch (error) {
    console.error("🔥 Error:", error);
    return NextResponse.json({}, { status: 500 });
  }
}
