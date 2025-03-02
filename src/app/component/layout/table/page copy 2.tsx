"use client";

export function Ordertable() {
  return (
    <div className="w-full max-w-full px-3 mt-0 ">
      {/* Order */}
      <div className="w-full relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border ">
        <h1 className="text-2xl font-bold mb-4">Orderlist</h1>

        {/* Flex Container for Event Time and Sort By Buttons */}
        <div className="flex justify-between mb-4">
          {/* Event Time Input */}
          <input
            type="datetime-local"
            className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Sort By Dropdown */}
          <div>
            <select className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="sales">Sort by Sales</option>
              <option value="price">Sort by Price</option>
              <option value="sold">Sort by Sold</option>
              <option value="rating">Sort by Rating</option>
            </select>
            <select className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="sales">Filte</option>
              <option value="price">Sort by Price</option>
              <option value="sold">Sort by Sold</option>
              <option value="rating">Sort by Rating</option>
            </select>
          </div>
        </div>

        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border border-gray-300">
                custermer name
              </th>
              <th className="px-4 py-2 border border-gray-300">
                Payment method
              </th>
              <th className="px-4 py-2 border border-gray-300">Date</th>
              <th className="px-4 py-2 border border-gray-300">Status </th>
              <th className="px-4 py-2 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 border border-gray-300">John Doe</td>
              <td className="px-4 py-2 border border-gray-300">Credit Card</td>
              <td className="px-4 py-2 border border-gray-300">2024-01-02</td>
              <td className="px-4 py-2 border border-gray-300">Completed</td>
              <td className="px-4 py-2 border border-gray-300">
                <button className="px-3 py-1 text-black rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
                  View
                </button>
              </td>
            </tr>
            <tr className="bg-gray-50">
              <td className="px-4 py-2 border border-gray-300">Jane Smith</td>
              <td className="px-4 py-2 border border-gray-300">PayPal</td>
              <td className="px-4 py-2 border border-gray-300">2024-01-01</td>
              <td className="px-4 py-2 border border-gray-300">Pending</td>
              <td className="px-4 py-2 border border-gray-300">
                <button className="px-3 py-1 text-black rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
                  View
                </button>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-gray-300">
                Alice Johnson
              </td>
              <td className="px-4 py-2 border border-gray-300">
                Bank Transfer
              </td>
              <td className="px-4 py-2 border border-gray-300">2023-12-31</td>
              <td className="px-4 py-2 border border-gray-300">Cancelled</td>
              <td className="px-4 py-2 border border-gray-300">
                <button className="px-3 py-1 text-black rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
                  View
                </button>
              </td>
            </tr>
            <tr className="bg-gray-50">
              <td className="px-4 py-2 border border-gray-300">Bob Brown</td>
              <td className="px-4 py-2 border border-gray-300">Cash</td>
              <td className="px-4 py-2 border border-gray-300">2023-12-30</td>
              <td className="px-4 py-2 border border-gray-300">Completed</td>
              <td className="px-4 py-2 border border-gray-300">
                <button className="px-3 py-1 text-black rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
                  View
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center items-center space-x-2 mt-4">
          {" "}
          <button
            aria-label="Previous Page"
            className="flex items-center px-4 py-2 text-black  rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <img src="/prev.png" alt="Previous" className="h-5 w-5 mr-1" />
            Previous
          </button>
          <div className="flex space-x-2">
            <button className="px-4 py-2 text-black rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
              1
            </button>
            <button className="px-4 py-2 text-black rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
              2
            </button>
            <button className="px-4 py-2 text-black rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
              3
            </button>
            <button className="px-4 py-2 text-black rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
              ...
            </button>
          </div>
          <button
            aria-label="Next Page"
            className="flex items-center px-4 py-2 text-black rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <img src="/next.png" alt="Next" className="h-5 w-5 mr-1" />
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export function Categorytable() {
  return (
    <div className="w-full max-w-full px-3 mt-10">
      {/* category */}
      <div className="relative flex flex-col bg-white p-4 rounded-lg shadow-md">
        {/* create */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Categories</h1>
          <div className="border bg-gray-200 px-4 py-2 rounded-lg cursor-pointer">
            <span className="text-sm">Create New</span>
          </div>
        </div>
        {/* search */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
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
                  d="M17 17l4 4"
                />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search products..."
              className="block w-full pl-10 pr-4 py-2 text-base bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        {/* table */}
        <div className="overflow-auto">
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
              {/* Table content */}
              <tr>
                <td className="px-4 py-2 border border-gray-300">Phones</td>
                <td className="px-4 py-2 border border-gray-300">
                  Id:56181dw7d8618
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  New York.png
                </td>
                <td className="px-4 py-2 border border-gray-300">Noparent</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* pagination */}
        <div className="mt-6 flex justify-between">
          <button className="bg-gray-500 text-white px-4 py-2 rounded-lg">
            Back
          </button>
          <button className="text-black px-4 py-2 rounded-lg">Show More</button>
        </div>
      </div>
    </div>
  );
}
export function Productstable() {
  return (
    <div className="w-full max-w-full px-3 mt-10">
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
                <td className="px-4 py-2 border border-gray-300">
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
        <div className="mt-6">
          <ul className="flex justify-end items-center space-x-2">
            <button className="bg-gray-500 text-white px-4 py-2 rounded-lg">
              กลับ
            </button>
            <button className="text-black px-4 py-2 rounded-lg">
              ดูเพิ่มเติม
            </button>
          </ul>
        </div>
      </div>
    </div>
  );
}
