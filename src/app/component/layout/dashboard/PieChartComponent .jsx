"use client";
import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

// Registering necessary components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

// Function สำหรับคำนวณเปอร์เซ็นต์
const calculatePercentage = (value, total) => {
    return ((value / total) * 100).toFixed(2);
};

export default function PieChartComponent() {
    const [salesData, setSalesData] = useState(null);

    // ดึงข้อมูลจาก API เมื่อ component ถูกโหลด
    useEffect(() => {
        const fetchSalesData = async () => {
            try {
                const response = await fetch("http://localhost:3001/api/SalesCategory");
                const data = await response.json();
                setSalesData(data); // เก็บข้อมูลใน state
            } catch (error) {
                console.error("Error fetching sales data:", error);
            }
        };

        fetchSalesData();
    }, []);

    // ถ้ายังไม่มีข้อมูลให้แสดงข้อความ Loading
    if (!salesData) {
        return <div>Loading...</div>;
    }

    // ข้อมูลที่ใช้ใน Doughnut Chart
    const data = {
        labels: salesData.map(item => item.category_name), // ชื่อหมวดหมู่
        datasets: [
            {
                label: "Sales by Category", // Label ของ Doughnut Chart
                data: salesData.map(item => item.total_sales), // ยอดขายจากข้อมูล
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4BC0C0",
                    "#9966FF",
                ], // สีของแต่ละส่วน
                hoverBackgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4BC0C0",
                    "#9966FF",
                ], // สีเมื่อ hover
            },
        ],
    };

    // Options สำหรับ Doughnut Chart
    const options = {
        responsive: true,
        maintainAspectRatio: false, // ปิดการรักษาสัดส่วนของกราฟ
        plugins: {
            tooltip: {
                enabled: false, // ปิดการแสดงค่าใน tooltip
            },
            legend: {
                position: "right", // เปลี่ยนตำแหน่งของ legend ให้เป็นด้านขวา
                labels: {
                    usePointStyle: true, // ใช้จุดวงกลมเพื่อแสดงสีแทนการแสดงสี่เหลี่ยม
                    padding: 20, // เพิ่ม padding ระหว่าง labels และกราฟ
                    generateLabels: (chart) => {
                        const dataset = chart.data.datasets[0];
                        const total = dataset.data.reduce((acc, val) => acc + val, 0);

                        return chart.data.labels.map((label, index) => {
                            const value = dataset.data[index];
                            const percentage = calculatePercentage(value, total);

                            return {
                                text: `${label} - ${percentage}%`, // เพิ่มเปอร์เซ็นต์ใน label
                                fillStyle: dataset.backgroundColor[index],
                                strokeStyle: dataset.backgroundColor[index],
                                lineWidth: 1,
                                hidden: chart.getDatasetMeta(0).data[index].hidden,
                                index,
                            };
                        });
                    },
                },
            },
        },
        cutout: "60%", // ทำให้กลางวงเป็นช่องว่าง (สำหรับให้มันดูเหมือนโดนัท)
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
                Sales by Category
            </h2>
            <div className="relative w-full h-64">
                <Doughnut data={data} options={options} />
            </div>
        </div>
    );
}
