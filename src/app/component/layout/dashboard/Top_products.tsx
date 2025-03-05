"use client";
import { useEffect, useState } from "react";

// Define the Product type
type Product = {
  product_name: string;
  total_sales: number;
  total_quantity: number;
};

export default function Top_products() {
  // Use the Product type in useState
  const [topSellingProducts, setTopSellingProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchTopSellingProducts() {
      try {
        const response = await fetch(
          "http://localhost:3001/api/Top_Selling_Products"
        );
        const data = await response.json();
        setTopSellingProducts(data);
      } catch (error) {
        console.error("Error fetching top-selling products:", error);
      }
    }

    fetchTopSellingProducts();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-purple-600 text-lg font-bold mb-4 text-center">
        Top Selling Products
      </h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border-b-2 p-2 text-purple-500">Product</th>
            <th className="border-b-2 p-2 text-purple-500">Order ID</th>
            <th className="border-b-2 p-2 text-purple-500">Price</th>
            <th className="border-b-2 p-2 text-purple-500">In Stock</th>
            <th className="border-b-2 p-2 text-purple-500">Units Sold</th>
          </tr>
        </thead>
        <tbody>
          {topSellingProducts.map((product, index) => (
            <tr key={index}>
              <td className="border-b p-2">{product.product_name}</td>
              <td className="border-b p-2">Order {index + 1}</td>{" "}
              {/* Order ID can be calculated or fetched separately */}
              <td className="border-b p-2">{product.total_sales}</td>{" "}
              {/* Assuming total_sales is the price */}
              <td className="border-b p-2">N/A</td>{" "}
              {/* In Stock data can be added if available */}
              <td className="border-b p-2">{product.total_quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
