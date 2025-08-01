import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // ✅ your firebase config
import ItemCard from "./ItemCard"; // ✅ assuming same as before

const BestSeller = () => {
  const [productsByCategory, setProductsByCategory] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const products = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // ✅ Group products by category
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

  return (
    <div className="border rounded-lg mt-4 border-gray-300">
      <div className="font-bold justify-items-center text-2xl mt-4 ">
        <h2>Our Products</h2>
      </div>

      {Object.keys(productsByCategory).map((category) => (
        <div key={category} className="mt-6">
          {/* Category Heading */}
          <h3 className="text-xl font-semibold mb-4 px-5">{category}</h3>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-5 mx-5 mb-5">
            {productsByCategory[category].map((item) => (
              <ItemCard
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.originalPrice}
                discount={item.discountPercent}
                image={item.image}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BestSeller;
