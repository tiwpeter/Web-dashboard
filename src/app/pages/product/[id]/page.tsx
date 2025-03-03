"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";

const ProductId = () => {
  const { id } = useParams(); // อ่านค่าจาก URL สำหรับ product id
  const [product, setProduct] = useState({
    product_name: "",
    description: "",
    price: "",
    stock: "",
    product_image: "", // เพิ่ม field สำหรับรูปภาพ
    category_id: "", // เพิ่มสำหรับเก็บ category id
    category_name: "", // เพิ่มสำหรับเก็บ category name
  });
  const [parentCategory, setParentCategory] = useState(""); // สถานะสำหรับเก็บชื่อ parent category

  useEffect(() => {
    // ดึงข้อมูลจาก API ตาม product id
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/Product/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        console.log(data);
        setProduct(data); // บันทึกข้อมูลที่ได้จาก API
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]); // ใช้ id ในการโหลดข้อมูลใหม่ทุกครั้งที่ id เปลี่ยน

  useEffect(() => {
    if (product.category_id) {
      // ดึงข้อมูลของ parent category ตาม category_id
      const fetchParentCategory = async () => {
        try {
          const response = await fetch(
            `http://localhost:3001/api/type/category/${product.category_id}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch parent category");
          }
          const data = await response.json();
          setParentCategory(data.parent_category); // บันทึกชื่อ parent category
        } catch (error) {
          console.error("Error fetching parent category:", error);
        }
      };

      fetchParentCategory();
    }
  }, [product.category_id]); // เมื่อ category_id เปลี่ยนให้ดึงข้อมูลใหม่

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!product) {
    return <div>Loading...</div>; // แสดงข้อความขณะรอข้อมูล
  }

  return (
    <div className="flex w-full space-x-4 flex-col lg:flex-row h-full">
      <div className="w-full lg:w-3/5 bg-white">
        <div className="flex-1">
          <div className="px-8 py-6">
            <div className="mb-6">
              <h6 className="mb-2 font-bold capitalize">Product Name</h6>
              <input
                type="text"
                name="product_name"
                value={product.name}
                onChange={handleChange}
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
                name="category_name"
                value={product.category_name}
                onChange={handleChange}
                className="focus:shadow-primary-outline dark:bg-slate-850 dark:text-white text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="mb-6">
              <h6 className="mb-2 font-bold capitalize">Parent Category</h6>
              <input
                type="text"
                name="parent_category"
                value={parentCategory || ""}
                readOnly
                className="focus:shadow-primary-outline dark:bg-slate-850 dark:text-white text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
              />
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
                  value={product.stock}
                  onChange={handleChange}
                  className="focus:shadow-primary-outline dark:bg-slate-850 dark:text-white text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div className="mb-6 ml-6">
                <h6 className="mb-2 font-bold capitalize">Sale Percent</h6>
                <input
                  type="text"
                  name="Regulor"
                  value={product.sale_percent}
                  onChange={handleChange}
                  className="focus:shadow-primary-outline dark:bg-slate-850 dark:text-white text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div className="mb-6 ml-6">
                <h6 className="mb-2 font-bold capitalize">Sale Price</h6>
                <input
                  type="text"
                  name="SKU"
                  value={product.price}
                  onChange={handleChange}
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
      {/*img */}
      <div className="w-full lg:w-2/5 max-w-full px-3 lg:flex-none">
        {" "}
        <div className="overflow-hidden rounded-2xl">
          <div className=" bg-white p-4 border-2 border-gray-200">
            <div className="">
              <img
                src={product.images && product.images[0]} // แสดงรูปแรกจาก Array images
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
        <div>
          {product.images &&
            product.images.map((image, index) => (
              <div
                key={index}
                className="p-2 mt-2 flex bg-white border border-gray-300 border-dashed items-center justify-center"
              >
                <div className="flex items-center w-full">
                  <img
                    src={image} // รูปที่มาจาก Array
                    alt={`Product image ${index + 1}`} // ใช้ index เพื่อแสดงข้อความใน alt tag
                    className="w-12 h-12" // ขนาดของรูปภาพที่แสดง
                  />
                  {/* แสดงรายละเอียดอื่นๆ เช่น ข้อความ หรือโปรเกรส */}
                  <div className="w-full ml-4 mr-4">
                    <div className="flex">
                      <div className="flex justify-between w-full">
                        <span>Image {index + 1}</span>
                        <span>100%</span>
                      </div>
                    </div>

                    <div className="mt-[-0.5rem]">
                      <progress
                        className="h-1 w-full"
                        value="100"
                        max="100"
                      ></progress>
                    </div>
                  </div>
                  <div
                    className="w-8 h-12 bg-cover"
                    style={{
                      backgroundImage:
                        "url('/iconproduct/right-wrong-icon32.png')",
                      backgroundPosition: "0 0", // แสดงภาพทางซ้ายสุด
                    }}
                  ></div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductId;
