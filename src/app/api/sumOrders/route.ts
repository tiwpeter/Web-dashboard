import { NextResponse } from "next/server";
import { getDBConnection } from "../../lib/db"; // Adjust path as needed

// กำหนดประเภทของ timePeriod
type TimePeriod = "day" | "week" | "month";

export async function GET(request: Request) {
  try {
    const db = await getDBConnection(); // Connect to SQLite database

    // Query to calculate revenue and total_sale
    const responseOrders = await db.all(`
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

    return NextResponse.json(responseOrders, { status: 200 });
  } catch (error) {
    console.error("🔥 Error:");
    return NextResponse.json({ }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const db = await getDBConnection();
    const { timePeriod }: { timePeriod: TimePeriod } = await request.json(); // รับค่า timePeriod จาก body

    let groupByClause = "";
    let orderByClause = "o.created_at DESC";

    // กำหนดเงื่อนไข GROUP BY ตามช่วงเวลา
    if (timePeriod === "day") {
      groupByClause = "DATE(o.created_at)";
    } else if (timePeriod === "week") {
      groupByClause = "strftime('%W', o.created_at)"; // Group by week number
    } else if (timePeriod === "month") {
      groupByClause = "strftime('%m-%Y', o.created_at)"; // Group by month
    } else {
      return NextResponse.json({ error: "Invalid time period" }, { status: 400 });
    }

    // Query SQL
    const responseOrders = await db.all(`
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

    return NextResponse.json(responseOrders, { status: 200 });
  } catch (error) {
    console.error("🔥 Error:", );
    return NextResponse.json({   }, { status: 500 });
  }
}
