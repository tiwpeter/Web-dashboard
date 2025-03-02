"use client";

export default function Add() {
  return (
    <div className=" bg-white">
      <div className="flex w-full space-x-4 flex-col lg:flex-row">
        {" "}
        <div className="w-full lg:w-3/5 bg-white ">
          {" "}
          <div className="flex-1 bg-gray-200">
            <div className="px-8 py-6">
              <div className="mb-8">
                <h6 className="mb-2 font-bold capitalize">Product Name</h6>
                <input
                  type="text"
                  name="productName"
                  placeholder="Product Name"
                  className="focus:shadow-primary-outline dark:bg-slate-850 dark:text-white text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="mb-8">
                <h6 className="mb-2 font-bold capitalize">
                  Product Description
                </h6>
                <textarea
                  id="product-description"
                  placeholder="Enter product description"
                  rows={8}
                  className="mt-1 block w-full rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:text-white px-4 py-2 text-sm leading-tight placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="mb-8">
                <h6 className="mb-2 font-bold capitalize">Category</h6>
                <input
                  type="text"
                  name="category"
                  placeholder="Category"
                  className="focus:shadow-primary-outline dark:bg-slate-850 dark:text-white text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex-1 bg-gray-200 h-full">
                <div className="">
                  <div className="mb-8">
                    <h6 className="mb-2 font-bold capitalize">Brand</h6>
                    <input
                      type="text"
                      name="productName"
                      placeholder="Brand name here"
                      className="focus:shadow-primary-outline dark:bg-slate-850 dark:text-white text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div className="flex">
                    <div className="mb-8">
                      <h6 className="mb-2 font-bold capitalize">SKU</h6>
                      <input
                        type="text"
                        name="SKU"
                        placeholder="FOX-2837"
                        className="focus:shadow-primary-outline dark:bg-slate-850 dark:text-white text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                    <div className="mb-8 ml-6">
                      <h6 className="mb-2 font-bold capitalize">SKU</h6>
                      <input
                        type="text"
                        name="SKU"
                        placeholder="FOX-2837"
                        className="focus:shadow-primary-outline dark:bg-slate-850 dark:text-white text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
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
                  className="object-contain w-full "
                />
              </div>
            </div>
          </div>
          {/****/}
          <div className="bg-white border border-gray-300 border-dashed p-4 flex flex-col items-center justify-center">
            <img src="/imgicon.png" alt="" />
            <span>Drop YourImage</span>
            <span>ada</span>
          </div>
          {/****/}
          <div className="flex bg-white border border-gray-300 border-dashed p-4 items-center justify-center">
            <img src="/imgicon.png" alt="" />
            <span>aaa</span>
          </div>
          <div className="flex bg-white border border-gray-300 border-dashed p-4 items-center justify-center">
            <img src="/imgicon.png" alt="" />
            <span>aaa</span>
          </div>
        </div>
      </div>
    </div>
  );
}
