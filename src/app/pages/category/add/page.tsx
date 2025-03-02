"use client";
import { useEffect, useState } from "react";

const CategoryAdd = () => {
  const [parents, setParents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedParentId, setSelectedParentId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [selectedParentImage, setSelectedParentImage] = useState("");

  useEffect(() => {
    fetchParents();
    fetchCategories();
  }, []);

  const fetchParents = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/type/parents");
      const data = await res.json();
      setParents(data);
    } catch (error) {
      console.error("Error fetching parent categories:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/category");
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleParentChange = (e) => {
    const parentId = e.target.value;
    setSelectedParentId(parentId);

    // ค้นหาข้อมูล parent ที่เลือก
    const selectedParent = parents.find(
      (parent) => parent.id === parseInt(parentId)
    );
    setSelectedParentImage(
      selectedParent ? selectedParent.parent_image_url : ""
    );
  };

  const handleCategorySubmit = async () => {
    if (!categoryName.trim()) {
      alert("Please enter a category name.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/api/category", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category_name: categoryName,
          parent_id: selectedParentId,
        }),
      });

      if (res.ok) {
        alert("Category added successfully!");
        setCategoryName("");
        fetchCategories();
      } else {
        alert("Failed to add category.");
      }
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  return (
    <div className="p-4 w-full bg-white">
      <div className="pb-8 border-b-1 ">
        <h1 className="text-4xl font-bold">Laptop</h1>
      </div>
      <div className="flex justify-between w-full mt-4 mb-4 border-b-1 pb-4 items-center">
        <h1 className="">Create Category</h1>
        <button className="px-4 py-2 bg-red-600 text-white">Delete</button>
      </div>
      <div className="flex">
        <div className="pb-8 pt-8 w-3/4 ">
          <div className="w-3/4">
            <span>Title</span>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full p-2 border-2 border-gray-300 rounded-lg bg-white text-gray-700"
              placeholder="Enter category name"
            />
          </div>

          <div className="pt-8">
            <h1 className="text-xl sm:text-2xl font-medium">Media</h1>
            <div className="w-3/4 flex flex-col sm:flex-row bg-gray-200 p-4 items-center">
              {selectedParentImage ? (
                <img
                  src={selectedParentImage}
                  alt="Selected Parent"
                  className="w-24 h-24 sm:w-32 sm:h-32 object-contain"
                />
              ) : (
                <img
                  src="/noproduct.jpg"
                  alt=""
                  className="w-24 h-24 sm:w-32 sm:h-32 object-contain"
                />
              )}
            </div>
          </div>
        </div>

        <div className="pb-8 pt-8 w-1/4">
          <span>Parent Category</span>
          <div className="flex items-center">
            <select
              className="w-full p-2 border-2 border-gray-300 rounded-lg bg-white text-gray-700"
              onChange={handleParentChange}
              value={selectedParentId}
            >
              <option value="">None</option>
              {parents.map((parent) => (
                <option key={parent.id} value={parent.id}>
                  {parent.parent_name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <button
        onClick={handleCategorySubmit}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Add Category
      </button>
    </div>
  );
};

export default CategoryAdd;
