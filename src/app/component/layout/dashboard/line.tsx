// components/LineChart.tsx
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  Filler,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  Filler
);

// Data for the line chart
const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"], // X-axis labels
  datasets: [
    {
      label: "My First Dataset",
      data: [65, 59, 80, 81, 56, 55, 40], // Y-axis data points
      borderWidth: 3,
      pointBorderColor: "#cb0c9f",
      pointBorderWidth: 3,
      tension: 0.5,
      fill: true,
      pointRadius: 0,
      borderColor: "rgb(75, 192, 192)", // Line color
      backgroundColor: (context) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, "rgb(75, 192, 192)");
        gradient.addColorStop(1, "rgba(75, 192, 192, 0.2)");
        return gradient;
      },
    },
  ],
};

// Options for customization (such as responsiveness, tooltips, etc.)
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top", // Position of the legend
    },
    tooltip: {
      mode: "index", // Tooltip mode
      intersect: false, // Tooltip should not intersect
    },
  },
  scales: {
    x: {
      beginAtZero: true,
      grid: {
        display: false, // Remove gridlines for the x-axis
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        display: false, // Remove gridlines for the y-axis
      },
    },
  },
};

const LineChart: React.FC = () => {
  return (
    <div className="chart-container p-4 bg-white shadow-xl rounded-2xl">
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
