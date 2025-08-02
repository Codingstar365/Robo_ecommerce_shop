// src/components/BestSeller.jsx
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import ItemCard from "./ItemCard";
import { useNavigate } from "react-router-dom";
import fallbackImage from "../assets/hero/download.jpg";

const BestSeller = () => {
  const [productsByCategory, setProductsByCategory] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const products = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          try {
            return {
              id: doc.id,
              ...data,
              image:
                data.image && data.image.trim() !== ""
                  ? data.image
                  : fallbackImage,
            };
          } catch (err) {
            console.error("Error loading image for product:", doc.id, err);
            return {
              id: doc.id,
              ...data,
              image: fallbackImage,
            };
          }
        });

        const grouped = products.reduce((acc, product) => {
          const category = product.category || "Uncategorized";
          if (!acc[category]) acc[category] = [];
          acc[category].push(product);
          return acc;
        }, {});

        setProductsByCategory(grouped);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  if (Object.keys(productsByCategory).length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No products found.
      </div>
    );
  }

  return (
    <div className="border rounded-lg mt-4 border-gray-300">
      <div className="font-bold justify-items-center text-2xl mt-4">
        <h2>Our Products</h2>
      </div>

      {Object.keys(productsByCategory).map((category) => (
        <div key={category} className="mt-6">
          <h3 className="text-xl font-semibold mb-4 px-5">{category}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-5 mx-5 mb-5">
            {productsByCategory[category].slice(0, 3).map((item) => (
              <ItemCard
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.originalPrice || item.price}
                discount={item.discountPercent || item.discount || 0}
                image={item.image}
                rating={item.rating}
              />
            ))}
          </div>

          {productsByCategory[category].length > 3 && (
            <div className="mb-5 px-5 flex justify-end">
              <button
                onClick={() =>
                  navigate(`/category/${encodeURIComponent(category)}`)
                }
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                See More
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BestSeller;
