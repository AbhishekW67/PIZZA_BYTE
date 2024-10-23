"use client";
import React, { useEffect, useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true); // New loading state

  // Fetch orders on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true); // Start loading
      try {
        const response = await fetch("/api/orders");
        const data = await response.json();
        setOrders(data.orders || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchOrders();
  }, []);

  // Show modal with order details
  const handleViewItems = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  // Calculate total price of the items in the selected order
  const calculateTotalPrice = (items) => {
    return items.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0).toFixed(2);
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
          Orders
          <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
            List of all orders
          </p>
        </caption>
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Order ID</th>
            <th scope="col" className="px-6 py-3">Mobile Number</th>
            <th scope="col" className="px-6 py-3">Order By</th>
            <th scope="col" className="px-6 py-3">Payment Method</th>
            <th scope="col" className="px-6 py-3">Order Summary<span className="sr-only">View Items</span></th>
          </tr>
        </thead>
        <tbody>
          {loading ? (  // Show loading state
            <tr>
              <td colSpan="6" className="text-center p-4">Loading orders...</td>
            </tr>
          ) : orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{order.id}</th>
                <td className="px-6 py-4">{order.mobile_number}</td>
                <td className="px-6 py-4">{order.order_by}</td>
                <td className="px-6 py-4">{order.payment_method}</td>
                <td className="px-6 py-4 ">
                  <button
                    onClick={() => handleViewItems(order)}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    View Items
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center p-4">No orders available</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal to show order items */}
      {showModal && selectedOrder && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={closeModal}
        >
          <div
            className="bg-white dark:bg-gray-800 p-6 rounded-lg w-1/2 shadow-lg transition-transform transform hover:scale-105"
            onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
          >
            <h2 className="text-xl font-semibold mb-4">Order Items for {selectedOrder.order_by}</h2>
            {/* Calculate and display total price of items */}
            <p className="font-medium text-lg">
              Total Price: RS.{calculateTotalPrice(JSON.parse(selectedOrder.items))} {/* Calculate total price */}
            </p>
            {/* Parse the items field and display each item */}
            {selectedOrder.items ? (
              JSON.parse(selectedOrder.items).map((item) => (
                <div key={item.id} className="mb-4 border-b border-gray-300 pb-2">
                  <p><strong>Title:</strong> {item.title}</p>
                  <p><strong>Description:</strong> {item.description}</p>
                  <p><strong>Quantity:</strong> {item.quantity}</p>
                  <p><strong>Price:</strong> Rs.{item.price}</p>
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-32 h-32 object-cover mt-2 rounded shadow-md"
                    />
                  )}
                </div>
              ))
            ) : (
              <p>No items available for this order.</p>
            )}
            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
