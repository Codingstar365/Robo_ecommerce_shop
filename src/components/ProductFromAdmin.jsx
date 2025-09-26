// src/components/BestSeller.jsx
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { db, storage } from "../firebase";
import ItemCard from "./ItemCard";
import { useNavigate } from "react-router-dom";
import fallbackImage from "../assets/hero/download.jpg";

const BestSeller = () => {
  const [productsByCategory, setProductsByCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const products = await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            const data = doc.data();
            let imageUrl = fallbackImage;

            if (data.image && data.image.trim() !== "") {
              try {
                if (data.image.startsWith("http")) {
                  imageUrl = data.image;
                } else {
                  const imgRef = ref(storage, data.image);
                  imageUrl = await getDownloadURL(imgRef);
                }
              } catch (err) {
                console.error(`Error fetching image for product ${doc.id}:`, err);
                imageUrl = fallbackImage;
              }
            }

            return {
              id: doc.id,
              ...data,
              image: imageUrl,
            };
          })
        );

        const grouped = products.reduce((acc, product) => {
          const category = product.category || "Uncategorized";
          if (!acc[category]) acc[category] = [];
          acc[category].push(product);
          return acc;
        }, {});

        setProductsByCategory(grouped);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="border rounded-lg mt-4 border-gray-300 p-6 text-center text-gray-500">
        <p>Loading products...</p>
      </div>
    );
  }

  if (Object.keys(productsByCategory).length === 0) {
    return (
      <div className="border rounded-lg mt-4 border-gray-300 p-10 text-center">
        <p className="text-gray-500 text-lg">🚀 No products found yet.</p>
      </div>
    );
  }

  return (
    <div className="border pb-6 rounded-lg mt-6 border-gray-300 shadow-sm">
      {/* Section Heading */}
      <div className="text-center py-6">
        <h2 className="text-3xl font-bold tracking-wide">
          <span className="text-primary">OUR </span>PRODUCTS
        </h2>
        <div className="w-24 h-1 bg-secondary mx-auto mt-2 rounded"></div>
      </div>

      {Object.keys(productsByCategory).map((category) => (
        <div key={category} className="mt-6">
          {/* Category Heading */}
          <h3 className="text-xl font-semibold mb-4 px-6 uppercase relative">
            {category}
            <span className="absolute left-6 -bottom-1 w-12 h-1 bg-primary rounded"></span>
          </h3>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-6">
            {productsByCategory[category].slice(0, 4).map((item) => (
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

          {/* See More Button */}
          {productsByCategory[category].length > 4 && (
            <div className="mb-6 mt-4 px-6 flex justify-end">
              <button
                onClick={() =>
                  navigate(`/category/${encodeURIComponent(category)}`)
                }
                className="bg-primary text-white px-5 py-2 rounded-lg shadow hover:bg-red-700 transition-all duration-300"
              >
                See More →
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BestSeller;
