"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // ใช้ useParams แทน useRouter
import { FaCcVisa, FaCcMastercard, FaCcAmex } from "react-icons/fa"; // นำเข้าไอคอน

// Define the type for order item
interface OrderItem {
  product_name: string;
  product_quantity: number;
  product_price: number;
}

interface Order {
  order_id: string;
  created_at: string;
  payment_method: string;
  user_email: string;
  phone: string;
  items: OrderItem[];
}

const OrderDetails = () => {
  const { id } = useParams(); // อ่านค่าจาก URL สำหรับ product id
  const [order, setOrder] = useState<Order | null>(null); // Explicitly type the state
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // สร้าง state สำหรับ loading

  // ดึงข้อมูลคำสั่งซื้อ
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/orders/${id}`);
        const data = await res.json();

        console.log("Product API Response:", data);

        if (res.ok) {
          if (data) {
            setOrder(data); // ใช้ setOrder แทน setOrders
          } else {
            console.error("Unexpected data format:", data);
            setOrder(null); // กำหนดเป็น null เมื่อไม่พบข้อมูล
          }
        } else {
          console.error("Error:", data.error);
          setError(data.error || "Unknown error");
          setOrder(null); // กำหนดเป็น null เมื่อมี error
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Failed to fetch data");
        setOrder(null); // กำหนดเป็น null เมื่อเกิดข้อผิดพลาด
      } finally {
        setLoading(false); // เปลี่ยนสถานะ loading เป็น false เมื่อดึงข้อมูลเสร็จ
      }
    };

    fetchOrder();
  }, [id]);

  // คำนวณ totalPrice
  const totalPrice = order?.items.reduce<number>((total, item) => {
    return total + item.product_quantity * item.product_price;
  }, 0);

  // คำนวณ taxAmount และ finalTotal
  const shippingCost = 20.0; // Example shipping cost
  const taxRate = 0.1; // 10% tax rate
  const taxAmount = totalPrice ? totalPrice * taxRate : 0;
  const finalTotal = totalPrice ? totalPrice + shippingCost + taxAmount : 0;

  // เลือกไอคอนบัตรเครดิตตามประเภท
  const renderCardIcon = (type: string) => {
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

  const detectCardType = (cardNumber: string) => {
    const cleanedCardNumber = cardNumber.replace(/-/g, "");

    const visaRegex = /^4[0-9]{12,15}$/;
    const mastercardRegex = /^(5[1-5][0-9]{14}|2[2-7][0-9]{14})$/;
    const amexRegex = /^3[47][0-9]{13}$/;
    const discoverRegex = /^6(?:011|5[0-9]{2})[0-9]{12}$/;

    if (visaRegex.test(cleanedCardNumber)) {
      return "Visa Card";
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

  const censorCardNumber = (cardNumber: string) => {
    if (!cardNumber) return "**** **** **** ****"; // Check if cardNumber is null or undefined
    const last4Digits = cardNumber.slice(-4); // Get the last 4 digits
    return `**** **** **** ${last4Digits}`; // Replace the first part with ****
  };

  const getCardImage = (cardType: string) => {
    switch (cardType) {
      case "Visa Card":
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!order) {
    return <div>No order found.</div>;
  }

  return (
    <div className="mt-[170px] flex-none w-full max-w-full px-3">
      <div className="relative flex flex-col bg-white mt-[-10rem] p-4">
        <div className="flex">
          <div className="pb-4">
            <h1 className="text-2xl font-bold mb-4">
              OrdersID:#{order.order_id}
            </h1>
            <h2>Time : {order.created_at} </h2>
          </div>
          <div className="border pending w-[80px] h-[25px] B flex items-center justify-center mt-[0.3rem] ml-4">
            <span className="text-sm text-yellow-500">Pending</span>
          </div>
        </div>
        <hr className="h-px mt-0 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent dark:bg-gradient-to-r dark:from-transparent dark:via-white dark:to-transparent" />

        <div className="flex space-x-6">
          <div className="flex-1 min-w-0">
            <div className="border-b border-bg-gray-100 py-4 pb-6">
              <div className="flex justify-between items-center">
                <div className="w-full">
                  <div className="text-lg font-semibold text-gray-700">
                    Payment Method
                  </div>
                  <div className="w-full border border-gray-300 p-4 rounded-lg shadow-sm mt-2">
                    {order.payment_method && order.payment_method !== "" && (
                      <div className="flex items-center">
                        <img
                          src={getCardImage(
                            detectCardType(order.payment_method)
                          )}
                          alt={detectCardType(order.payment_method)}
                          style={{ width: "35px", height: "23px" }}
                          className="mr-2.5"
                        />
                        <p className="ml-2 text-sm text-gray-600">
                          {detectCardType(order.payment_method)}
                        </p>
                        <p className="ml-2 text-sm text-gray-600">
                          {censorCardNumber(order.payment_method)}
                        </p>
                      </div>
                    )}

                    <div className="mt-2 text-sm text-gray-500">
                      Email:{" "}
                      <span className="font-semibold text-gray-700">
                        {order.user_email}
                      </span>
                    </div>
                    <div className="mt-1 text-sm text-gray-500">
                      Phone:{" "}
                      <span className="font-semibold text-gray-700">
                        (+66) {order.phone}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="border-b border-bg-gray-100 py-4 pb-6">
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
                  <td className="border px-4 py-2">{item.product_name}</td>
                  <td className="border px-4 py-2">{item.product_quantity}</td>
                  <td className="border px-4 py-2">{item.product_price}</td>
                  <td className="border px-4 py-2">
                    {(item.product_quantity * item.product_price).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 border-t pt-4">
          <h2 className="text-xl font-semibold">Sales Summary</h2>
          <div className="mt-4">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>${totalPrice?.toFixed(2)}</span>
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

export default OrderDetails;
