"use client";
import React, { useState, useEffect } from "react";
import { useCart } from "@/lib/CartContext";
import { ImSpinner3 } from "react-icons/im";

export default function OrderNow() {
    const { cartItems, removeItemFromCart, clearCart } = useCart();
    const [loading, setLoading] = useState(false);
    let userEmail = "";
    useEffect(() => {
        userEmail = localStorage.getItem("email");
    }, []);

    // State to store form inputs
    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        email: userEmail || "",
        paymentMethod: "credit_card",
        addressLine1: "",
        addressLine2: "",
    });

    // Handle form input changes
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [id]: value }));
    };

    // Handle order submission
    const handleOrder = async () => {
        setLoading(true);
        const orderDetails = {
            userEmail: formData.email,
            cartItems: JSON.stringify(cartItems), // Store cart items as a JSON string
            totalPrice: cartItems.reduce(
                (total, item) => total + item.price * item.quantity,
                0
            ),
            address1: formData.addressLine1,
            address2: formData.addressLine2,
            paymentMethod: formData.paymentMethod,
            mobileNumber: formData.mobile,
        };

        try {
            const response = await fetch("/api/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderDetails),
            });

            if (response.ok) {
                alert("Order placed successfully!");
                clearCart(); // Clear the cart after a successful order
            } else {
                const error = await response.json();
                console.error("Order Error:", error);
                alert("Failed to place the order. Please try again.");
            }
        } catch (err) {
            console.error("Network Error:", err);
            alert("An error occurred. Please check your network connection.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <h1 className="text-3xl font-semibold text-gray-900 dark:text-white text-center mb-4" id="order">
                Order Now
            </h1>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-4/6 mx-auto mb-4">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-16 py-3">
                                <span className="sr-only">Image</span>
                            </th>
                            <th scope="col" className="px-6 py-3">Product</th>
                            <th scope="col" className="px-6 py-3">Qty</th>
                            <th scope="col" className="px-6 py-3">Price</th>
                            <th scope="col" className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item) => (
                            <tr
                                key={item.id}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                            >
                                <td className="p-4">
                                    <img
                                        src={item.imageUrl}
                                        className="w-16 md:w-32 max-w-full max-h-full"
                                        alt={item.title}
                                    />
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                    {item.title}
                                </td>
                                <td className="px-6 py-4">
                                    <span className="font-semibold text-gray-900 dark:text-white">
                                        {item.quantity}
                                    </span>
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                    ₹{item.price * item.quantity}
                                </td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => removeItemFromCart(item)}
                                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <form className="mb-4">
                    <div className="grid gap-6 mb-6 md:grid-cols-2 mt-3">
                        <div>
                            <label
                                htmlFor="name"
                                className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600"
                                placeholder="John"
                                required
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="mobile"
                                className="w-full block mb-2 text-base font-medium text-gray-900 dark:text-white"
                            >
                                Mobile Number
                            </label>
                            <input
                                type="text"
                                id="mobile"
                                value={formData.mobile}
                                onChange={handleInputChange}
                                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-700"
                                placeholder="+91 XXXXXXXXXX"
                                required
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-700"
                                required
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="paymentMethod"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Payment Method
                            </label>
                            <select
                                id="paymentMethod"
                                value={formData.paymentMethod}
                                onChange={handleInputChange}
                                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-700"
                                required
                            >
                                <option value="credit_card">Cash on Delivery</option>
                                <option value="debit_card">Debit Card</option>
                                <option value="upi">UPI</option>
                                <option value="net_banking">Net Banking</option>
                            </select>
                        </div>
                    </div>

                    <div className="mb-6">
                        <label
                            htmlFor="addressLine1"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Address Line 1
                        </label>
                        <input
                            type="text"
                            id="addressLine1"
                            value={formData.addressLine1}
                            onChange={handleInputChange}
                            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-700"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label
                            htmlFor="addressLine2"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Address Line 2 (Optional)
                        </label>
                        <input
                            type="text"
                            id="addressLine2"
                            value={formData.addressLine2}
                            onChange={handleInputChange}
                            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-700"
                        />
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="button"
                            onClick={handleOrder}
                            className="px-14 py-2.5 text-white bg-green-700 hover:bg-green-800 rounded-lg"
                        >
                            {/* Order Now */}
                            {loading ? (
                                <>
                                <ImSpinner3 className="animate-spin h-5 w-5 mx-auto" /> Ordering...
                                </>
                            ) : (
                                "Order Now"
                            )}
                        </button>
                    </div>
                </form> 
            </div>
        </>
    );
}
