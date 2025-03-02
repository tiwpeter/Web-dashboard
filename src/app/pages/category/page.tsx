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
      <div className="flex flex-col bg-white mt-0 p-4">
        <div className="flex">
          <h1 className="text-2xl font-bold mb-4">Categories</h1>
          <div className="border bg-gray-200 w-[115px] h-[25px] flex items-center justify-center mt-[0.3rem] ml-4">
            <a href="/pages/category/add" className="text-sm">
              Create New
            </a>
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
              {combinedData.length > 0 ? (
                combinedData.map((item, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border border-gray-300">
                      {item.title}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {item.id}
                    </td>
                    <td className="px-4 py-2 border border-gray-300 flex items-center">
                      <img
                        src={item.media}
                        alt="Media"
                        className="w-[1.8rem] h-[1.8rem] mr-3 rounded-full bg-gray-200 shadow-md"
                      />
                      <span className="text-ellipsis overflow-hidden whitespace-nowrap max-w-[300px]">
                        {item.media}
                      </span>
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {item.parent}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-4 py-2 border border-gray-300 text-center"
                  >
                    No Data Available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
