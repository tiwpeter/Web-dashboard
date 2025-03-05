"use client";

import BarChartComponent from "./bar";
import PieChartComponent from "./PieChartComponent ";
import Top_products from "./Top_products";

const DashBoardLayout = () => {
  const statsData = [
    {
      title: "Total Sales",
      value: "$120,784.02",
      change: "2% since last quarter",
      icon: "/slie/store.png",
      details: ["Increased client retention", "Positive feedback"],
      trendIcon: "icon/arrow-up.png",
    },
    {
      title: "Visitors",
      value: "18,896",
      change: "-5.6% since last month",
      icon: "/slie/store.png",
      details: ["Improved performance", "Optimistic forecast"],
      trendIcon: "icon/arrow-up.png",
    },
    {
      title: "Total Orders",
      value: "8,500",
      change: "+3% since last quarter",
      icon: "/slie/store.png",
      details: ["Higher engagement", "Better support"],
      trendIcon: "icon/arrow-up.png",
    },
    {
      title: "Refunded",
      value: "$2,876",
      change: "+13% since last month",
      icon: "/slie/store.png",
      details: ["Steady growth", "Increased demand"],
      trendIcon: "icon/arrow-up.png",
    },
  ];

  const topSellingProducts = [
    {
      name: "Product A",
      orderId: "12345",
      price: "$50.00",
      inStock: "Yes",
      unitsSold: "2,000",
    },
    {
      name: "Product B",
      orderId: "12346",
      price: "$30.00",
      inStock: "No",
      unitsSold: "1,500",
    },
    {
      name: "Product C",
      orderId: "12347",
      price: "$75.00",
      inStock: "Yes",
      unitsSold: "3,000",
    },
    {
      name: "Product D",
      orderId: "12348",
      price: "$120.00",
      inStock: "No",
      unitsSold: "500",
    },
  ];

  return (
    <div className="w-full bg-gray-100">
      <div className="h-full">
        <div>
          {/* Card Section */}
          <div className="flex">
            <div className="w-2/5 p-4">
              <div className="flex flex-wrap">
                {statsData.map((stat, index) => (
                  <div key={index} className="w-1/2 p-3">
                    <div className="bg-white shadow-lg rounded-lg p-4">
                      <div className="flex items-center gap-2">
                        <img
                          src={stat.icon}
                          alt={stat.title}
                          className="w-4 h-4"
                        />
                        <h2 className="text-lg font-bold">{stat.title}</h2>
                      </div>

                      <div className="mt-1 bottom-1 border-b-[1px] border-gray-300 pb-2">
                        <p
                          className={`text-xl font-semibold ${
                            stat.change.includes("-")
                              ? "text-red-600"
                              : "text-green-600"
                          }`}
                        >
                          {stat.value}
                        </p>
                        <p className="text-sm font-medium text-gray-400 ">
                          <span>{stat.change.split(" ")[0]}</span>
                          <span className="ml-1">
                            {stat.change.split(" ").slice(1).join(" ")}
                          </span>
                        </p>
                      </div>

                      <div className="mt-2 flex items-center">
                        <p className="text-sm">View Report</p>
                        <div className="mt-1 flex items-center justify-center h-full">
                          <img
                            src="/up-arrowRigth.png"
                            alt=""
                            className="w-2 h-2 ml-3"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:w-3/5 p-4">
              <div className="bg-white rounded-lg shadow-md mt-3 p-4">
                <div>
                  <div className="flex justify-between items-center">
                    <p className=" text-gray-400 text-xl">Revenue</p>
                    <select className="px-4 py-1 ml-auto border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold text-gray-700">
                      <option value="option1" className="text-gray-500">
                        Option 1
                      </option>
                      <option value="option2" className="text-gray-500">
                        Option 2
                      </option>
                      <option value="option3" className="text-gray-500">
                        Option 3
                      </option>
                    </select>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <p className="text-3xl">$16,400.12</p>

                      <div className="flex   rounded ml-4">
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
                <BarChartComponent />
              </div>
            </div>
          </div>
          {/* Chart Section */}
          <div className="flex">
            <div className="flex-[70%] bg-gray-100 rounded-lg p-4 shadow-md">
              <Top_products />
            </div>
            <div className="flex-[20%] bg-gray-100 flex items-center justify-center rounded-lg p-4 shadow-md">
              <PieChartComponent />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayout;
