import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

const AdminDeleteButton = () => {
  const [products, setProducts] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [imageLoadingStates, setImageLoadingStates] = useState({}); // Track image load state individually

  // ✅ Fetch products instantly
  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productList);

      // Initialize loading state for each product image
      const loadingState = {};
      productList.forEach((product) => {
        loadingState[product.id] = true;
      });
      setImageLoadingStates(loadingState);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoadingData(false);
    }
  };

  // ✅ Track when a specific image is loaded
  const handleImageLoad = (id) => {
    setImageLoadingStates((prev) => ({
      ...prev,
      [id]: false,
    }));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ Delete product from Firestore
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await deleteDoc(doc(db, "products", id));
      setProducts((prev) => prev.filter((product) => product.id !== id));
      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product.");
    }
  };

  if (loadingData) {
    return <p className="p-4">Loading products...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">All Products</h2>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="space-y-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex items-center gap-4 border-b pb-3"
            >
              {/* Product Image with loader */}
              <div className="w-20 h-20 relative">
                {imageLoadingStates[product.id] && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                <img
                  src={product.image || "https://via.placeholder.com/80"}
                  alt={product.name}
                  className={`w-20 h-20 object-cover rounded transition-opacity duration-300 ${
                    imageLoadingStates[product.id] ? "opacity-0" : "opacity-100"
                  }`}
                  onLoad={() => handleImageLoad(product.id)}
                  onError={() => handleImageLoad(product.id)} // Avoid stuck loader
                />
              </div>

              {/* Product Details */}
              <div className="flex-1">
                <h3 className="text-lg font-medium">{product.name}</h3>
                <p className="text-sm text-gray-500">
                  Category: {product.category} | Subcategory:{" "}
                  {product.subcategory}
                </p>
                <p className="text-sm text-gray-700">
                  Price: ₹{product.originalPrice}
                  {product.discountPercent && (
                    <span className="ml-2 text-green-600">
                      -{product.discountPercent}%
                    </span>
                  )}
                </p>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => handleDelete(product.id)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDeleteButton;
