"use client";
import React, { useEffect, useState } from "react";

export default function Order() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // แสดงแค่ 6 รายการต่อหน้า

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/Product");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        console.log("Fetched data:", data);

        // แปลง array ซ้อนให้อยู่ในรูปแบบ array เดียว
        const flattenedData = data.flat();
        setProducts(flattenedData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  // คำนวณจำนวนหน้าทั้งหมด
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // ตัดข้อมูลเฉพาะหน้าปัจจุบัน
  const displayedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="mt-[170px] flex-none w-full max-w-full px-3">
      <div className="relative flex flex-col bg-white mt-[-9rem] p-4">
        <div className="flex">
          <h1 className="text-2xl font-bold mb-4">Products All</h1>
          <div className="border bg-gray-200 w-[115px] h-[25px] flex items-center justify-center mt-[0.3rem] ml-4">
            <span className="text-sm">Create New</span>
          </div>
        </div>

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
                <th className="px-4 py-2 border-b border-gray-300">Action</th>
              </tr>
            </thead>
            <tbody>
              {displayedProducts.length > 0 ? (
                displayedProducts.map((product, index) => (
                  <tr
                    key={product.product_id}
                    className={`${
                      index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"
                    } text-gray-800`}
                  >
                    <td className="px-4 py-2 border-b border-gray-300">
                      <div className="flex items-center">
                        <div className="w-8 h-8 mr-3 rounded-full bg-gray-200 shadow-md flex justify-center items-center">
                          <img
                            src={product.product_images[0]}
                            alt="Product"
                            className="object-cover h-full w-full rounded-full"
                          />
                        </div>
                        <span title={product.product_name}>
                          {product.product_name.length > 20
                            ? product.product_name.slice(0, 20) + "..."
                            : product.product_name}
                        </span>
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-4">
            <button
              aria-label="Previous Page"
              className={`flex items-center px-4 py-2 text-white rounded-lg `}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <img src="/prev.png" alt="Previous" className="h-5 w-5 mr-1" />
            </button>

            <div className="flex space-x-2">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <button
              aria-label="Next Page"
              className={`flex items-center px-4 py-2 text-white rounded-lg `}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              <img src="/next.png" alt="Next" className="h-5 w-5 mr-1" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
