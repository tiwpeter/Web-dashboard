"use client";
import React, { useState } from "react";
import { FaCcVisa, FaCcMastercard, FaCcAmex } from "react-icons/fa"; // นำเข้าไอคอน

const OrderDetail = () => {
  const order = {
    orderId: "ORD-123456",
    customerName: "John Doe",
    customerEmail: "johndoe@example.com",
    orderDate: "2024-12-27",
    status: "Shipped",
    totalAmount: "$250.00",
    payment: {
      method: "Credit Card",
      cardType: "Visa", // Visa, Mastercard, Amex
      cardLast4Digits: "4242",
      transactionId: "TXN-987654321",
      paymentDate: "2024-12-25",
    },
    items: [
      {
        productName: "Wireless Headphones",
        quantity: 1,
        price: "$150.00",
      },
      {
        productName: "Bluetooth Speaker",
        quantity: 1,
        price: "$100.00",
      },
    ],
  };

  // เลือกไอคอนบัตรเครดิตตามประเภท
  const renderCardIcon = (type) => {
    switch (type) {
      case "Visa":
        return <FaCcVisa className="text-blue-600 text-2xl" />;
      case "Mastercard":
        return <FaCcMastercard className="text-red-600 text-2xl" />;
      case "Amex":
        return <FaCcAmex className="text-green-600 text-2xl" />;
      default:
        return <span className="text-gray-500">Unknown</span>;
    }
  };

  // Calculate total price for items
  const calculateTotalPrice = () => {
    return order.items.reduce((total, item) => {
      return total + parseFloat(item.price.slice(1)) * item.quantity;
    }, 0);
  };

  const totalPrice = calculateTotalPrice();
  const shippingCost = 20.0; // Example shipping cost
  const taxRate = 0.1; // 10% tax rate
  const taxAmount = totalPrice * taxRate;
  const finalTotal = totalPrice + shippingCost + taxAmount;

  return (
    <div className="mt-[170px] flex-none w-full max-w-full px-3">
      <div className="relative flex flex-col bg-white mt-[-10rem] p-4">
        <div className="flex">
          <div className="pb-4">
            <h1 className="text-2xl font-bold mb-4">OrdersID:#96487</h1>
            <h2>Time : {order.orderDate} </h2>
          </div>
          <div className="border pending w-[80px] h-[25px] B flex items-center justify-center mt-[0.3rem] ml-4">
            <span className="text-sm text-yellow-500">Pending</span>
          </div>
        </div>
        <hr className="h-px mt-0 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent dark:bg-gradient-to-r dark:from-transparent dark:via-white dark:to-transparent" />

        {/* Payment Method and Note Sections */}
        <div className="flex space-x-6">
          {/* Payment Method */}
          <div className="flex-1 min-w-0">
            <div className="border-t border-b border-bg-gray-100 py-4 pb-6">
              <div className="flex justify-between items-center">
                <div className="w-full">
                  <div className="text-lg font-semibold text-gray-700">
                    Payment Method
                  </div>
                  <div className="w-full border border-gray-300 p-4 rounded-lg shadow-sm mt-2">
                    <div className="flex items-center mt-2">
                      {renderCardIcon(order.payment.cardType)}
                      <span className="ml-2 text-sm text-gray-600">
                        Visa Card **** **** 8926
                      </span>
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      Email:{" "}
                      <span className="font-semibold text-gray-700">
                        johndoe@example.com
                      </span>
                    </div>
                    <div className="mt-1 text-sm text-gray-500">
                      Phone:{" "}
                      <span className="font-semibold text-gray-700">
                        (123) 456-7890
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Note */}
          <div className="flex-1 min-w-0">
            <div className="border-t border-b border-bg-gray-100 py-4 pb-6">
              <div className="flex justify-between items-center">
                <div className="w-full">
                  <div className="text-lg font-semibold text-gray-700">
                    Note
                  </div>
                  <div className="w-full border border-gray-300 p-14 rounded-lg shadow-sm mt-2">
                    {/* Note content can go here */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Table */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold">Order Items</h2>
          <table className="min-w-full mt-4 border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2 text-left">Product Name</th>
                <th className="border px-4 py-2 text-left">Quantity</th>
                <th className="border px-4 py-2 text-left">Price</th>
                <th className="border px-4 py-2 text-left">Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{item.productName}</td>
                  <td className="border px-4 py-2">{item.quantity}</td>
                  <td className="border px-4 py-2">{item.price}</td>
                  <td className="border px-4 py-2">
                    ${parseFloat(item.price.slice(1)) * item.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Sales Summary */}
        <div className="mt-8 border-t pt-4">
          <h2 className="text-xl font-semibold">Sales Summary</h2>
          <div className="mt-4">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span>Shipping</span>
              <span>${shippingCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span>Tax (10%)</span>
              <span>${taxAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm mt-2 font-semibold">
              <span>Total</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
