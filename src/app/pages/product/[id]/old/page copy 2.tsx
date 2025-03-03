"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // ใช้ useParams แทน useRouter

const ProductId = () => {
  const { id } = useParams(); // อ่านค่าจาก URL สำหรับ product id
  const [product, setProduct] = useState({
    product_name: "",
    description: "",
    price: "",
    stock: "",
    product_image: "", // เพิ่ม field สำหรับรูปภาพ
  });
  const [image, setImage] = useState(null); // สถานะสำหรับเก็บไฟล์รูปภาพที่ผู้ใช้เลือก

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // แสดงตัวอย่างรูปภาพที่เลือก
    }
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("product_name", product.product_name);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("stock", product.stock);

    // เพิ่มการส่งไฟล์ภาพไปด้วยหากมีการเลือก
    if (image) {
      const fileInput = document.querySelector("input[type='file']");
      formData.append("product_image", fileInput.files[0]);
    }

    try {
      const response = await fetch(`http://localhost:3001/api/Product/${id}`, {
        method: "PUT", // ใช้ PUT ในการอัปเดตข้อมูล
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Failed to update product");
      }
      const updatedProduct = await response.json();
      setProduct(updatedProduct);
      setImage(null); // ลบไฟล์ภาพหลังการบันทึก
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  if (!product) {
    return <div>Loading...</div>; // แสดงข้อความขณะรอข้อมูล
  }

  return (
    <div>
      <h1>Edit Product</h1>
      <form>
        {/* ใช้ input สำหรับการแก้ไขชื่อสินค้า */}
        <label>
          Product Name:
          <input
            type="text"
            name="product_name"
            value={product.product_name}
            onChange={handleChange}
          />
        </label>

        {/* ใช้ textarea สำหรับการแก้ไขคำอธิบายสินค้า */}
        <label>
          Description:
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
          />
        </label>

        <label>
          Price:
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
          />
        </label>

        <label>
          Stock:
          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
          />
        </label>

        {/* ฟอร์มสำหรับอัปโหลดรูปภาพ */}
        <label>
          Product Image:
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>

        {/* แสดงภาพตัวอย่างที่ผู้ใช้เลือก */}
        {image && (
          <div>
            <h3>Preview:</h3>
            <img
              src={image}
              alt="Product Preview"
              className="w-32 h-32 object-cover"
            />
          </div>
        )}

        {/* ปุ่มสำหรับบันทึกการเปลี่ยนแปลง */}
        <div>
          <button type="button" onClick={handleSave}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductId;
