// src/pages/OrderBriefInfo.jsx
import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import useCartStore from "../data/stores/cartStore";
import { Star } from "lucide-react";
import fallbackImage from "../assets/hero/download.jpg"; // ✅ Added fallback image

const OrderBriefInfo = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const addToCart = useCartStore((state) => state.addToCart);
  const setBuyNowItem = useCartStore((state) => state.setBuyNowItem);

  const [product, setProduct] = useState(location.state?.product || null);
  const [loading, setLoading] = useState(!product);
  const [imageLoading, setImageLoading] = useState(true);
  const [productImage, setProductImage] = useState(fallbackImage); // ✅ State for image

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();

          const {
            isAddingCategory,
            discountedPrice,
            enabled,
            subcategory,
            newCategory,
            rcCoins,
            newSubcategory,
            isAddingSubcategory,
            category,
            ...filteredData
          } = data;

          const imgSrc =
            data.image && data.image.trim() !== ""
              ? data.image
              : fallbackImage;

          // ✅ Calculate discounted price if discountPercent exists
          const finalDiscountedPrice =
            data.discountPercent && data.price
              ? Math.round(data.price * (1 - data.discountPercent / 100))
              : data.finalPrice || data.price;

          setProduct({
            id: docSnap.id,
            ...filteredData,
            description: data.description || "",
            image: imgSrc,
            originalPrice: data.originalPrice || data.price || null, // ✅ Ensure originalPrice is set
            discountPercent: data.discountPercent || null,
            discountedPrice: finalDiscountedPrice,
          });
          setProductImage(imgSrc); // ✅ Set image
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    if (!product || !product.description) {
      fetchProduct();
    } else {
      // ✅ Handle case when coming from state
      const imgSrc =
        product.image && product.image.trim() !== ""
          ? product.image
          : fallbackImage;
      setProductImage(imgSrc);
    }
  }, [id, product]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.discountedPrice || product.finalPrice || product.price,
        image: productImage,
      });
      alert("Added to cart!");
    }
  };

  const handleBuyNow = () => {
    if (product) {
      setBuyNowItem({
        id: product.id,
        name: product.name,
        price: product.discountedPrice || product.finalPrice || product.price,
        image: productImage,
      });
      navigate("/checkout");
    }
  };

  if (loading) {
    return (
      <div className="mt-20 p-6 text-center">
        <p className="animate-pulse text-gray-500">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mt-20 p-6 text-center">
        <h2 className="text-lg font-semibold text-red-600">Product Not Found</h2>
        <p>We couldn’t find details for product ID: {id}</p>
      </div>
    );
  }

  return (
    <div className="pt-24 px-6 mt-6 mb-10 max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Image */}
        <div className="md:w-1/2 flex items-center justify-center bg-gray-50 border-gray-300 rounded-lg p-4 relative min-h-[300px]">
          {imageLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
              <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
          )}
          <img
            src={productImage}
            alt={product.name}
            className={`w-full h-auto max-h-[500px] object-contain transition-opacity duration-300 ${
              imageLoading ? "opacity-0" : "opacity-100"
            }`}
            onLoad={() => setImageLoading(false)}
            onError={() => {
              setProductImage(fallbackImage);
              setImageLoading(false);
            }}
          />
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-3">{product.name}</h1>
          <p className="text-gray-500 mb-3">Product ID: {product.id}</p>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-2 mb-4">
              {Array(5)
                .fill()
                .map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < product.rating
                        ? "fill-yellow-500 text-yellow-500"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              <span className="text-gray-600 text-sm">
                {product.rating} / 5
              </span>
            </div>
          )}

          {/* Price */}
          <div className="mb-4">
            <span className="text-2xl font-bold text-green-600">
              ₹{product.discountedPrice}
            </span>
            {product.originalPrice && (
              <span className="ml-3 text-lg text-gray-500 line-through">
                ₹{product.originalPrice}
              </span>
            )}
            {product.discountPercent && (
              <span className="ml-3 text-sm text-red-500 font-semibold">
                ({product.discountPercent}% OFF)
              </span>
            )}
          </div>

          {/* Description */}
          {product.description && (
            <p className="mb-6 text-gray-700">{product.description}</p>
          )}

          {/* Additional Details */}
          <div className="space-y-1 mb-6">
            {Object.entries(product).map(([key, value]) => {
              if (
                [
                  "id",
                  "image",
                  "name",
                  "price",
                  "finalPrice",
                  "originalPrice",
                  "discountedPrice",
                  "discountPercent",
                  "rating",
                  "description",
                ].includes(key)
              )
                return null;
              return (
                <p key={key} className="text-gray-700">
                  <strong className="capitalize">{key}:</strong>{" "}
                  {String(value)}
                </p>
              );
            })}
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleAddToCart}
              className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderBriefInfo;