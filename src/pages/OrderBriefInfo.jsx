import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase"; // ✅ adjust path to your firebase config
import useCartStore from "../data/stores/cartStore";

const OrderBriefInfo = () => {
  const { id } = useParams();
  const location = useLocation();
  const addToCart = useCartStore((state) => state.addToCart);

  const [product, setProduct] = useState(location.state?.product || null);
  const [loading, setLoading] = useState(!product);

  // ✅ Fetch product from Firestore if not passed via state
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.error("No product found");
          setProduct(null);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    if (!product) {
      fetchProduct();
    }
  }, [id, product]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.finalPrice || product.price,
        image: product.image,
      });
      alert("Added to cart!");
    }
  };

  if (loading) {
    return (
      <div className="mt-20 p-6 text-center">
        <p>Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mt-20 p-6 text-center">
        <h2 className="text-lg font-semibold">Product Not Found</h2>
        <p>We couldn’t find the details for product ID: {id}</p>
      </div>
    );
  }

  return (
    <div className="pt-24 p-6 max-w-5xl mx-auto bg-white shadow rounded">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/2 object-contain border p-4 rounded"
        />
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 break-words">
            {product.name}
          </h1>
          <p className="text-gray-500 mb-4">Product ID: {product.id}</p>
          <p className="text-xl font-semibold text-secondary mb-2">
            ₹{product.finalPrice || product.price}
          </p>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <button
            onClick={handleAddToCart}
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderBriefInfo;
