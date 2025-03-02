import { useEffect, useState } from "react";

const CategoryAdd = () => {
  return (
    <div className="p-4 w-full bg-white">
      {/* Category breadcrumb */}

      {/* Laptop title section */}
      <div className="pb-8 border-b-2 ">
        <h1 className="text-4xl font-bold">Laptop</h1>
      </div>
      <div className="flex justify-between w-full mt-4 mb-4 border-b-2 pb-4 items-center">
        <h1 className="">create category</h1>
        <button className="px-4 py-2 bg-red-600 text-white">Delete</button>
      </div>
      <div className="flex">
        <div className="pb-8 pt-8 w-3/4 ">
          <div className="w-3/4">
            <span>title</span>
            <input
              type="text"
              className="w-full p-2 border-2 border-gray-300 rounded-lg bg-white text-gray-700"
              placeholder="Enter text"
            />
          </div>

          <div className="pt-8">
            <h1 className="text-xl sm:text-2xl font-medium">Media</h1>
            <div className="w-3/4 flex flex-col sm:flex-row bg-gray-200 p-4 items-center">
              <img
                src="/noproduct.jpg"
                alt=""
                className="w-24 h-24 sm:w-32 sm:h-32 object-contain"
              />
              <div className="ml-0 sm:ml-4 flex flex-col justify-center text-center sm:text-left">
                <span>www</span>
                <span>www</span>
              </div>
            </div>
          </div>
        </div>

        <div className=" pb-8 pt-8 w-1/4">
          <span>paren</span>

          <div className="flex items-center">
            <select className="w-full p-2 border-2 border-gray-300 rounded-lg bg-white text-gray-700">
              <option value="">Select an option</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
            <div className="border-2 border-gray-300 rounded-lg flex items-center justify-center w-10 h-10">
              <button className="text-lg font-bold text-gray-700">+</button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between w-full mt-4 mb-16   ">
        <h1 className="text-2xl sm:text-3xl font-semibold">Bredcumbs</h1>
      </div>
    </div>
  );
};

export default CategoryAdd;
/*


*/
