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

export default function BarChartComponent() {
  const [ordersData, setOrdersData] = useState([]);

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

  // Prepare data for Bar Chart
  const labels = ordersData.map((order) =>
    new Date(order.order_date).toLocaleTimeString()
  );
  const revenueData = ordersData.map((order) => order.revenue);
  const totalSaleData = ordersData.map((order) => order.total_sale);

  // Data for the Bar Chart
  const data = {
    labels: labels, // Order dates as labels
    datasets: [
      {
        label: "Revenue",
        data: revenueData, // Revenue for each order
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
        display: false, // Show legend
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
      {/* Adjust the height of the container */}
      <Bar data={data} options={{ ...options, maintainAspectRatio: false }} />
    </div>
  );
}
