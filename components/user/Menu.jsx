"use client"
import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard";

export default function Menu() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Replace this URL with your actual API endpoint
        fetch("/api/products") // Make sure to use the correct endpoint
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setItems(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error fetching data: {error.message}</p>;
    }

    return (
        <div className="flex flex-col items-center"  id="menu">
            <div className="mb-5 w-10/12">
                <h2 className="text-center font-bold text-3xl mt-10">Menu</h2>
                <div className="flex flex-wrap justify-center gap-12 mt-5">
                    {items.map((item) => (
                        <ItemCard
                            key={item.id} // Ensure you have a unique id for each item
                            id={item.id}
                            imageUrl={item.image_url}
                            title={item.name}
                            description={item.description}
                            price={item.price}
                        />  
                    ))}
                </div>
            </div>
        </div>
    );
}
