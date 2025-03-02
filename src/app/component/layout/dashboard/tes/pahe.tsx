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
  const [timePeriod, setTimePeriod] = useState("day"); // State for selected time period

  useEffect(() => {
    // Fetching data from the API based on the selected time period
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/sumOrders?period=${timePeriod}`
        );
        const data = await response.json();
        setOrdersData(data);
      } catch (error) {
        console.error("Error fetching orders data:", error);
      }
    };

    fetchData();
  }, [timePeriod]); // Re-fetch when the timePeriod changes

  // Prepare data for Bar Chart
  const labels = ordersData.map((order) =>
    new Date(order.order_date).toLocaleTimeString()
  );
  const revenueData = ordersData.map((order) => order.revenue);

  // Data for the Bar Chart (Only Revenue dataset)
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
        display: true, // Show legend
      },
    },
    scales: {
      x: {
        title: {
          display: true,
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
    <div className="lg:w-3/5 p-4">
      <div className="bg-white rounded-lg shadow-md mt-3 p-4">
        <div>
          <div className="flex justify-between items-center">
            <p className="text-gray-400 text-xl">Revenue</p>
            <select
              className="px-4 py-1 ml-auto border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold text-gray-700"
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)} // Update time period on selection change
            >
              <option value="day" className="text-gray-500">
                Day
              </option>
              <option value="week" className="text-gray-500">
                Week
              </option>
              <option value="month" className="text-gray-500">
                Month
              </option>
            </select>
          </div>
          <div>
            <div className="flex items-center">
              <p className="text-3xl">$16,400.12</p>

              <div className="flex rounded ml-4">
                <div className="bg-green-100 flex h-6">
                  <img
                    src="/right-up.png"
                    alt="Right Up"
                    className="w-6 h-6 "
                  />
                  <p className="bg-green-100 text-green-600 font-semibold">
                    {"+10%"}
                  </p>
                </div>
              </div>

              <div className="flex justify-end items-center w-full">
                <div className="mr-4">
                  <div className="mr-4 inline-flex w-auto h-auto bg-orange-500 text-white justify-center items-center rounded-full py-1 px-1"></div>
                  <span className="text-gray-400 ">Profit</span>
                </div>
                <div>
                  <div className="mr-4 inline-flex w-auto h-auto bg-blue-500 text-white justify-center items-center rounded-full py-1 px-1"></div>
                  <span className="text-gray-400">Loss</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Bar data={data} options={{ ...options, maintainAspectRatio: false }} />
      </div>
    </div>
  );
}
