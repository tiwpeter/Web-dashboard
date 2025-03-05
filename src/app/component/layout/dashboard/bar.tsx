"use client";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registering necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Define types for the order data
type Order = {
  order_date: string;
  revenue: number;
  total_sale: number;
};

export default function BarChartComponent() {
  const [ordersData, setOrdersData] = useState<Order[]>([]); // State for orders data
  const [timePeriod, setTimePeriod] = useState("day"); // State for selected time period

  useEffect(() => {
    // Fetching data from the API
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/sumOrders");
        const data = await response.json();
        setOrdersData(data);
      } catch (error) {
        console.error("Error fetching orders data:", error);
      }
    };

    fetchData();
  }, []);

  // Function to group the data based on the selected time period
  const groupByTimePeriod = (orders: Order[], period: string) => {
    const groupedData: {
      [key: string]: { revenue: number; total_sale: number };
    } = {};

    orders.forEach((order) => {
      const orderDate = new Date(order.order_date);
      let label: string = ""; // Initialize label with an empty string

      if (period === "day") {
        label = orderDate.toLocaleDateString(); // Group by day
      } else if (period === "week") {
        // Group by weekday (Mon, Tue, Wed, ... in Thai)
        const daysOfWeek = [
          "อาทิตย์",
          "จันทร์",
          "อังคาร",
          "พุธ",
          "พฤหัสบดี",
          "ศุกร์",
          "เสาร์",
        ];
        const dayOfWeek = orderDate.getDay(); // Get the day of the week (0 = Sunday, 1 = Monday, etc.)
        label = daysOfWeek[dayOfWeek]; // Get the name of the day in Thai
      } else if (period === "month") {
        label = `${orderDate.getMonth() + 1}-${orderDate.getFullYear()}`; // Group by month
      }

      // Add revenue and total sale for each period
      if (!groupedData[label]) {
        groupedData[label] = { revenue: 0, total_sale: 0 };
      }
      groupedData[label].revenue += order.revenue;
      groupedData[label].total_sale += order.total_sale;
    });

    return groupedData;
  };

  const groupedOrders = groupByTimePeriod(ordersData, timePeriod);

  // Prepare data for Bar Chart
  const labels = Object.keys(groupedOrders);
  const revenueData = labels.map((label) => groupedOrders[label].revenue);

  // Data for the Bar Chart (Only Revenue dataset)
  const data = {
    labels: labels, // Grouped time periods as labels
    datasets: [
      {
        label: "Revenue",
        data: revenueData, // Revenue for each period
        backgroundColor: "#0088FE", // Blue for revenue
        borderColor: "#0088FE",
        borderWidth: 1,
      },
    ],
  };

  // Options for the Bar Chart
  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: false, // Disable tooltips
      },
      legend: {
        display: false, // Hide legend
      },
    },
    scales: {
      x: {
        title: {
          display: false,
          text: "Order Time", // Title for the x-axis
        },
      },
      y: {
        title: {
          display: false, // Hide y-axis title
        },
        ticks: {
          stepSize: 500, // Set step size to 500
        },
      },
    },
  };

  return (
    <div className="w-full h-[13rem] mt-4">
      <select
        className="px-4 py-1 ml-auto border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold text-gray-700"
        value={timePeriod}
        onChange={(e) => setTimePeriod(e.target.value)} // Update time period on selection change
      >
        <option value="week" className="text-gray-500">
          Week
        </option>
      </select>
      {/* Adjust the height of the container */}
      <Bar data={data} options={{ ...options, maintainAspectRatio: false }} />
    </div>
  );
}
