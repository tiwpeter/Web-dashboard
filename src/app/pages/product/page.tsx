"use client";
import React, { useEffect, useState } from "react";

export default function Order() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/Product");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        console.log("Fetched data:", data); // Log เพื่อตรวจสอบ
        // เข้าถึง array แรกของ data
        setProducts(data[0]); // ดึงแค่ array ตัวแรก
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mt-[170px] flex-none w-full max-w-full px-3">
      <div className="relative flex flex-col  bg-white mt-[-9rem] p-4">
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
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-800">
                <th className="px-4 py-2 border-b border-gray-300 text-left">
                  Product name
                </th>
                <th className="px-4 py-2 border-b border-gray-300 text-left">
                  Created At
                </th>
                <th className="px-4 py-2 border-b border-gray-300 text-left">
                  Price
                </th>
                <th className="px-4 py-2 border-b border-gray-300 text-left">
                  Stock
                </th>
                <th className="px-4 py-2 border-b border-gray-300 ">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product, index) => (
                  <tr
                    key={product.product_id}
                    className={`${
                      index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"
                    } text-gray-800`}
                  >
                    <td className="px-4 py-2 border-b border-gray-300 ">
                      <div className="flex items-center">
                        <div className="w-8 h-8 mr-3 rounded-full bg-gray-200 shadow-md flex justify-center items-center">
                          <img
                            src={product.product_images[0]}
                            alt="Product"
                            className="object-cover h-full w-full rounded-full"
                          />
                        </div>
                        {product.product_name}
                      </div>
                    </td>

                    <td className="px-4 py-2 border-b border-gray-300">
                      {product.created_at}
                    </td>

                    <td className="px-4 py-2 border-b border-gray-300">
                      {product.price}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300">
                      {product.stock}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300 flex justify-center gap-2">
                      <button className="bg-blue-500 text-white py-2 px-4 rounded-lg">
                        View
                      </button>
                      <button className="bg-red-500 text-white py-2 px-4 rounded-lg">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* เ with numbers */}
        <div className="flex justify-center items-center space-x-2 mt-4">
          {" "}
          <button
            aria-label="Previous Page"
            className="flex items-center px-4 py-2 text-white "
          >
            <img src="/prev.png" alt="Previous" className="h-5 w-5 mr-1" />
          </button>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
              1
            </button>
            <button className="px-4 py-2 ">2</button>
            <button className="px-4 py-2 ">3</button>
            <button className="px-4 py-2 ">...</button>
          </div>
          <button
            aria-label="Next Page"
            className="flex items-center px-4 py-2 text-white "
          >
            <img src="/next.png" alt="Next" className="h-5 w-5 mr-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
