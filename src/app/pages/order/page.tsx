"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Fetch orders data from the API
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/orders");
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);
  const detectCardType = (cardNumber) => {
    const cleanedCardNumber = cardNumber.replace(/-/g, "");

    const visaRegex = /^4[0-9]{12,15}$/;
    const mastercardRegex = /^(5[1-5][0-9]{14}|2[2-7][0-9]{14})$/;
    const amexRegex = /^3[47][0-9]{13}$/;
    const discoverRegex = /^6(?:011|5[0-9]{2})[0-9]{12}$/;

    if (visaRegex.test(cleanedCardNumber)) {
      return "Visa";
    } else if (mastercardRegex.test(cleanedCardNumber)) {
      return "MasterCard";
    } else if (amexRegex.test(cleanedCardNumber)) {
      return "American Express";
    } else if (discoverRegex.test(cleanedCardNumber)) {
      return "Discover";
    } else {
      return "Unknown";
    }
  };

  const getCardImage = (cardType) => {
    switch (cardType) {
      case "Visa":
        return "/card-logos/VISA.png"; // Path to the Visa card image
      case "MasterCard":
        return "/card-logos/mastercard.png"; // Path to the MasterCard card image
      case "American Express":
        return "/card-logos/amex.png"; // Path to the American Express card image
      case "Discover":
        return "/card-logos/discover.png"; // Path to the Discover card image
      default:
        return "/card-logos/unknown.png"; // Default image for unknown card types
    }
  };

  const censorCardNumber = (cardNumber) => {
    if (!cardNumber) return "**** **** **** ****"; // Check if cardNumber is null or undefined
    const last4Digits = cardNumber.slice(-4); // Get the last 4 digits
    return `**** **** **** ${last4Digits}`; // Replace the first part with ****
  };

  return (
    <div className="w-full max-w-full px-3 mt-6">
      {/* Order */}
      <div className="flex flex-col bg-white mt-0 p-4">
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
              <option value="sales">Filter</option>
              <option value="price">Sort by Price</option>
              <option value="sold">Sort by Sold</option>
              <option value="rating">Sort by Rating</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border border-gray-300">Order Date</th>
              <th className="px-4 py-2 border border-gray-300">Customer</th>
              <th className="px-4 py-2 border border-gray-300">Payment</th>
              <th className="px-4 py-2 border border-gray-300">Total</th>
              <th className="px-4 py-2 border border-gray-300">
                Delivery Items
              </th>
              <th className="px-4 py-2 border border-gray-300">Status</th>
              <th className="px-4 py-2 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.order_id}
                className={order.status === "Completed" ? "" : "bg-gray-50"}
              >
                <td className="px-4 py-2 border border-gray-300">
                  {order.created_at}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {order.user_email}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {order.payment_method && order.payment_method !== "" && (
                    <div className="flex items-center">
                      <img
                        src={getCardImage(detectCardType(order.payment_method))}
                        alt={detectCardType(order.payment_method)}
                        style={{ marginLeft: "10px", width: "50px" }}
                      />
                      <p>{censorCardNumber(order.payment_method)}</p>
                    </div>
                  )}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  ${order.total_price}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {order.total_quantity} Items
                </td>
                <td className="px-4 py-2 border border-gray-300">comple</td>
                <td className="px-4 py-2 border border-gray-300">
                  <button
                    className="px-3 py-1 text-black rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    onClick={() =>
                      router.push(`/pages/order/${order.order_id}`)
                    }
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center items-center space-x-2 mt-4">
          <button
            aria-label="Previous Page"
            className="flex items-center px-4 py-2 text-white"
          >
            <img src="/prev.png" alt="Previous" className="h-5 w-5 mr-1" />
          </button>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
              1
            </button>
            <button className="px-4 py-2 ">2</button>
            <button className="px-4 py-2 ">3</button>
            <button className="px-4 py-2 ">...</button>
          </div>
          <button
            aria-label="Next Page"
            className="flex items-center px-4 py-2 text-white"
          >
            <img src="/next.png" alt="Next" className="h-5 w-5 mr-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
