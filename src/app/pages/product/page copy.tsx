"use client";
import React, { useState } from "react";

export default function Order() {
  return (
    <div className="mt-[170px] flex-none w-full max-w-full px-3">
      <div className="relative flex flex-col  bg-white mt-[-10rem] p-4">
        <div className="flex">
          <h1 className="text-2xl font-bold mb-4">Products All</h1>
          <div className="border bg-gray-200 w-[115px] h-[25px] flex items-center justify-center mt-[0.3rem] ml-4">
            <span className="text-sm">Create New</span>
          </div>
          <div className="ml-auto mb-4">
            <button
              id="gridViewBtn"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg mr-2"
            >
              Grid View
            </button>
            <button
              id="listViewBtn"
              className="bg-green-500 text-white py-2 px-4 rounded-lg"
            >
              List View
            </button>
          </div>
        </div>

        {/* แสดงข้อมูลตามหน้า */}
        {/* Table */}
        <div className="flex-1 basis-5/12 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl text-gray-800 font-semibold mb-4">
            Top products
          </h2>
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-800">
                <th className="px-4 py-2 border-b border-gray-300 text-left">
                  Product name
                </th>
                <th className="px-4 py-2 border-b border-gray-300 text-left">
                  Order ID
                </th>
                <th className="px-4 py-2 border-b border-gray-300 text-left">
                  Price
                </th>
                <th className="px-4 py-2 border-b border-gray-300 text-left">
                  Solid
                </th>
                <th className="px-4 py-2 border-b border-gray-300 text-left">
                  Sales
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }).map((_, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"
                  } text-gray-800`}
                >
                  <td className="px-4 py-2 border-b border-gray-300">
                    Product {index + 1}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300">
                    OrderID-{index + 1}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300">
                    ${((index + 1) * 10).toFixed(2)}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300">456</td>
                  <td className="px-4 py-2 border-b border-gray-300">
                    ${((index + 1) * 100000).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* เ with numbers */}
        <div className="flex justify-center items-center space-x-2 mt-4">
          {" "}
          <button
            aria-label="Previous Page"
            className="flex items-center px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <img src="/prev.png" alt="Previous" className="h-5 w-5 mr-1" />
            Previous
          </button>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
              1
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
              2
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
              3
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
              ...
            </button>
          </div>
          <button
            aria-label="Next Page"
            className="flex items-center px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <img src="/next.png" alt="Next" className="h-5 w-5 mr-1" />
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
