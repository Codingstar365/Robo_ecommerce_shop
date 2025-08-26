// src/pages/CategoryPage.jsx
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase"; // ✅ no need for storage now
import { useParams } from "react-router-dom";
import ItemCard from "../components/ItemCard";
import fixedImage from "../../src/assets/download4.jpg"; // ✅ force all products to use this

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFallback, setIsFallback] = useState(false);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        console.log("Fetching products for category:", categoryName);

        // ✅ Try with category filter
        const q = query(
          collection(db, "products"),
          where("category", "==", categoryName)
        );

        let querySnapshot = await getDocs(q);

        // ✅ If no products found, fallback to all products
        if (querySnapshot.empty) {
          console.warn(
            `No products found in category "${categoryName}". Fetching all products instead.`
          );
          querySnapshot = await getDocs(collection(db, "products"));
          setIsFallback(true);
        } else {
          setIsFallback(false);
        }

        const productsData = querySnapshot.docs.map((doc) => {
          const data = doc.data();

          return {
            id: doc.id,
            ...data,
            image: fixedImage, // ✅ always use download4.jpg
          };
        });

        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching category products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [categoryName]);

  if (loading) {
    return (
      <div className="text-center mt-10">
        <p className="text-lg font-semibold">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-5 mt-8 mb-5">
      {/* ✅ Main Heading */}
      <h2 className="text-3xl font-bold mb-8 text-center uppercase">
        {isFallback ? "All Products" : categoryName}
      </h2>

      {/* ✅ Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {products.length > 0 ? (
          products.map((item) => (
            <ItemCard
              key={item.id}
              id={item.id}
              name={item.name}
              price={item.originalPrice || item.price}
              discount={item.discountPercent || item.discount || 0}
              image={item.image} // ✅ always download4.jpg
              rating={item.rating}
            />
          ))
        ) : (
          <p className="col-span-4 text-center text-gray-500">
            No products available.
          </p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
