import React from "react";

const App = () => {
  return (
    <div className="flex w-full space-x-4 flex-col lg:flex-row h-full">
      <div className="w-full lg:w-3/5 bg-white ">
        {" "}
        <div className="flex-1 ">
          <div className="px-8 py-6">
            <div className="mb-6">
              <h6 className="mb-2 font-bold capitalize">Product Name</h6>
              <input
                type="text"
                name="productName"
                placeholder="Product Name"
                className="focus:shadow-primary-outline dark:bg-slate-850 dark:text-white text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="mb-6">
              <h6 className="mb-2 font-bold capitalize">Product Description</h6>
              <textarea
                id="product-description"
                placeholder="Enter product description"
                rows={8}
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:text-white px-4 py-2 text-sm leading-tight placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="mb-6">
              <h6 className="mb-2 font-bold capitalize">Category</h6>
              <input
                type="text"
                name="category"
                placeholder="Category"
                className="focus:shadow-primary-outline dark:bg-slate-850 dark:text-white text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="flex-1 h-full">
              <div className="">
                <div className="mb-6">
                  <h6 className="mb-2 font-bold capitalize">Brand</h6>
                  <input
                    type="text"
                    name="productName"
                    placeholder="Brand name here"
                    className="focus:shadow-primary-outline dark:bg-slate-850 dark:text-white text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
            <div className="flex">
              <div className="mb-6">
                <h6 className="mb-2 font-bold capitalize">SKU</h6>
                <input
                  type="text"
                  name="SKU"
                  placeholder="FOX-2837"
                  className="focus:shadow-primary-outline dark:bg-slate-850 dark:text-white text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div className="mb-6 ml-6">
                <h6 className="mb-2 font-bold capitalize">Stock quanlity</h6>
                <input
                  type="text"
                  name="Stock quanlity"
                  placeholder="FOX-2837"
                  className="focus:shadow-primary-outline dark:bg-slate-850 dark:text-white text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div className="mb-6 ml-6">
                <h6 className="mb-2 font-bold capitalize">Regulor Price</h6>
                <input
                  type="text"
                  name="Regulor"
                  placeholder="FOX-2837"
                  className="focus:shadow-primary-outline dark:bg-slate-850 dark:text-white text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div className="mb-6 ml-6">
                <h6 className="mb-2 font-bold capitalize">Sale Price</h6>
                <input
                  type="text"
                  name="SKU"
                  placeholder="FOX-2837"
                  className="focus:shadow-primary-outline dark:bg-slate-850 dark:text-white text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
            <div className="mb-6">
              <h6 className="mb-2 font-bold capitalize">Tag</h6>
              <textarea
                id="product-description"
                placeholder="Enter product description"
                rows={4}
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:text-white px-4 py-2 text-sm leading-tight placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-blue-500 text-white">
                Update
              </button>
              <button className="px-4 py-2 bg-red-500 text-white">
                Delete
              </button>
              <button className="px-4 py-2 bg-gray-500 text-white">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-2/5 max-w-full px-3 lg:flex-none">
        {" "}
        <div className="overflow-hidden rounded-2xl">
          <div className=" bg-white p-4 border-2 border-gray-200">
            <div className="">
              <img
                src="/noproduct.jpg"
                alt="Product"
                className="w-full max-w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
        {/****/}
        <div className="bg-white mt-4 mb-4">
          <div>Product Gollery</div>
          <div className="ml-4 mr-4 mt-4 bg-white border border-gray-300 border-dashed p-4 flex flex-col items-center justify-center">
            <img src="/iconproduct/imageDrop.png" alt="" />

            <span>Drop YourImage</span>
            <span>ada</span>
          </div>
        </div>
        {/****/}
        <div className="p-2 mt-2 flex bg-white border border-gray-300 border-dashed  items-center justify-center">
          <img src="/iconproduct/AAAShodse.jpg" alt="" className="w-12 h-12" />{" "}
          {/* 32px = 8 * 4px scale */}
          <div className="w-full ml-4 mr-4">
            <div className="flex">
              <div className="flex justify-between w-full">
                <span>aaa</span>
                <span>63%</span>
              </div>
            </div>

            <div className="mt-[-0.5rem]">
              <progress className="h-1 w-full" value="60" max="100"></progress>
            </div>
          </div>
          <div
            className="w-8 h-12 bg-cover"
            style={{
              backgroundImage: "url('/iconproduct/right-wrong-icon32.png')",
              backgroundPosition: "100% 0", // แสดงภาพทางซ้ายสุด
            }}
          ></div>
        </div>
        <div className="p-2 mt-2 flex bg-white border border-gray-300 border-dashed  items-center justify-center">
          <img src="/iconproduct/AAAShodse.jpg" alt="" className="w-12 h-12" />{" "}
          {/* 32px = 8 * 4px scale */}
          <div className="w-full ml-4 mr-4">
            <div className="flex">
              <div className="flex justify-between w-full">
                <span>aaa</span>
              </div>
            </div>

            <div className="mt-[-0.5rem]">
              <progress className="h-1 w-full" value="100" max="100"></progress>
            </div>
          </div>
          <div
            className="w-8 h-12 bg-cover"
            style={{
              backgroundImage: "url('/iconproduct/right-wrong-icon32.png')",
              backgroundPosition: "0 0", // แสดงภาพทางซ้ายสุด
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default App;
