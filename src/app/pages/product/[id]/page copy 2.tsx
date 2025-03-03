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
                value={product.product_name}
                onChange={handleChange}
                className="focus:shadow-primary-outline dark:bg-slate-850 dark:text-white text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
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
    </div>
  );
};

export default ProductId;
