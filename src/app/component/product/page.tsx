"use client";

export default function product() {
  return (
    <div>
      <div>
        {/* ส่วนค้นหา */}
        <div className="mb-4 flex items-center gap-2">
          <input
            type="text"
            placeholder="Search..."
            className="flex-1 px-4 py-2 rounded-md border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600">
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
