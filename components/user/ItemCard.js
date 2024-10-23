import React from 'react';
import { useCart } from '@/lib/CartContext';

export default function ItemCard({ id, imageUrl, title, description, price }) {
    const { addItemToCart } = useCart();

    const handleAddToCart = () => {
        const item = { id, imageUrl, title, description, price }; // Pass the unique ID
        addItemToCart(item);
    };

    return (
        <div className="w-full max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#" className="flex items-center justify-center m-3">
                <img className="rounded-lg object-cover" src={imageUrl} alt={title} />
            </a>
            <div className="px-5 pb-5">
                <a href="#">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{title}</h5>
                </a>
                <p className="mt-2 text-gray-600 dark:text-gray-400 mb-4">{description}</p>
                <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">₹{price}</span>
                    <button 
                        onClick={handleAddToCart}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    );
}
