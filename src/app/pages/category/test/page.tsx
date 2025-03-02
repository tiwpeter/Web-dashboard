"use client";

import { useEffect, useState } from "react";

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [parents, setParents] = useState([]);

  useEffect(() => {
    // ดึงข้อมูลจาก API categories
    fetch("http://localhost:3001/api/type/category")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error fetching categories:", err));

    // ดึงข้อมูลจาก API parents
    fetch("http://localhost:3001/api/type/parents")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched parents:", data); // log parents
        setParents(data);
      })
      .catch((err) => console.error("Error fetching parents:", err));
  }, []);

  // รวมข้อมูล category และ parent
  const combinedData = categories.map((category) => {
    const parentData =
      parents.find((p) => Number(p.id) === Number(category.parent_id)) || {};

    return {
      title: category.category_name,
      id: category.id,
      media: parentData.parent_image_url || "No Image",
      parent: parentData.parent_name || "No Parent",
    };
  });

  console.log(combinedData);

  return (
    <div className="w-full max-w-full px-3 mt-6">
      {/* category */}
      <div className="flex flex-col bg-white mt-0 p-4">
        {/* create */}
        <div className="flex">
          <h1 className="text-2xl font-bold mb-4">Categories</h1>
          <div className="border bg-gray-200 w-[115px] h-[25px] flex items-center justify-center mt-[0.3rem] ml-4">
            <span className="text-sm">Create New</span>
          </div>
        </div>

        {/* search */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="relative flex-1">
            {/* Icon for search (magnifying glass) */}
            <span className="absolute inset-y-0 left-3 flex items-center pl-2 text-gray-500 dark:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a4 4 0 11-8 0 4 4 0 018 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 17l4 4M19 19l-4-4"
                />
              </svg>
            </span>

            {/* Input for search */}
            <input
              type="text"
              id="search"
              placeholder="Search products..."
              className="block w-full pl-10 pr-4 py-2 text-base bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-800 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />

            {/* Select filter */}
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 space-x-2">
              <select className="text-xs p-2 border rounded-md">
                <option value="">Columns</option>
                <option value="electronics">Electronics</option>
                <option value="devices">Devices</option>
                <option value="home-appliances">Home Appliances</option>
                <option value="toys">Toys</option>
              </select>
              <select className="text-xs p-2 border rounded-md">
                <option value="">Filter</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="furniture">Furniture</option>
              </select>
            </div>
          </div>
        </div>

        {/* table */}
        {/* แสดงข้อมูลตามหน้า */}
        <div className="p-4">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border border-gray-300">Title</th>
                <th className="px-4 py-2 border border-gray-300">Id</th>
                <th className="px-4 py-2 border border-gray-300">Media</th>
                <th className="px-4 py-2 border border-gray-300">Parent</th>
              </tr>
            </thead>
            <tbody>
              {/* ข้อมูลตัวอย่างที่แสดงขึ้นอยู่กับหน้า */}
              <tr>
                <td className="px-4 py-2 border border-gray-300">Phones</td>
                <td className="px-4 py-2 border border-gray-300">
                  Id:56181dw7d8618
                </td>
                <td className="px-4 py-2 border border-gray-300 flex items-center">
                  <img
                    src=""
                    alt="Product"
                    className="w-[1.8rem] h-[1.8rem] mr-3 rounded-full bg-gray-200 shadow-md"
                  />
                  New York.png
                </td>
                <td className="px-4 py-2 border border-gray-300">Noparent</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-gray-300">2</td>
                <td className="px-4 py-2 border border-gray-300">Jane Smith</td>
                <td className="px-4 py-2 border border-gray-300">34</td>
                <td className="px-4 py-2 border border-gray-300">
                  Los Angeles
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-gray-300">3</td>
                <td className="px-4 py-2 border border-gray-300">
                  Michael Brown
                </td>
                <td className="px-4 py-2 border border-gray-300">22</td>
                <td className="px-4 py-2 border border-gray-300">Chicago</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-gray-300">4</td>
                <td className="px-4 py-2 border border-gray-300">
                  Emily Clark
                </td>
                <td className="px-4 py-2 border border-gray-300">29</td>
                <td className="px-4 py-2 border border-gray-300">Miami</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-gray-300">5</td>
                <td className="px-4 py-2 border border-gray-300">
                  Sarah Connor
                </td>
                <td className="px-4 py-2 border border-gray-300">41</td>
                <td className="px-4 py-2 border border-gray-300">Detroit</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-gray-300">6</td>
                <td className="px-4 py-2 border border-gray-300">
                  David Tennant
                </td>
                <td className="px-4 py-2 border border-gray-300">35</td>
                <td className="px-4 py-2 border border-gray-300">
                  San Francisco
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-gray-300">7</td>
                <td className="px-4 py-2 border border-gray-300">John Smith</td>
                <td className="px-4 py-2 border border-gray-300">45</td>
                <td className="px-4 py-2 border border-gray-300">Houston</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-gray-300">No Data</td>
                <td className="px-4 py-2 border border-gray-300">-</td>
                <td className="px-4 py-2 border border-gray-300">-</td>
                <td className="px-4 py-2 border border-gray-300">-</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Pagination with numbers */}
        {/* Pagination */}
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
