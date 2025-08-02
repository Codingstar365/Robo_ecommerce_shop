import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { useParams } from "react-router-dom";
import ItemCard from "../../src/components/ItemCard";


const CategoryPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const q = query(
          collection(db, "products"),
          where("category", "==", categoryName)
        );
        const querySnapshot = await getDocs(q);
        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching category products:", error);
      }
    };

    fetchCategoryProducts();
  }, [categoryName]);

  return (
    <>


      <div className="container mx-auto px-5 mt-8 mb-5">
        {/* ✅ Main Heading */}
        <h2 className="text-3xl font-bold mb-8 text-center mt-19">
          {categoryName}
        </h2>

        {/* ✅ Products Grid (4 per row on large screens) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 ">
          {products.map((item) => (
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

     
    </>
  );
};

export default CategoryPage;
