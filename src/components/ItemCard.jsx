import React, { useState, useEffect } from "react";
import { Star, Heart } from "lucide-react";
import fallbackImage from "../../src/assets/hero/download.jpg";
import useCartStore from "../data/stores/cartStore";
import wishlistStore from "../data/stores/wishlistStore";
import userStore from "../data/stores/userStore";
import { useNavigate } from "react-router-dom";

const ItemCard = ({
  id,
  name,
  price,
  discount,
  image: img,
  rating = 0,
  isAdmin = false,
  enabled = true,
  onToggleStatus // ✅ new prop for admin toggle
}) => {
  const finalPrice = Math.round(price * (1 - discount / 100));
  const navigate = useNavigate();

  const addToCart = useCartStore((state) => state.addToCart);
  const setBuyNowItem = useCartStore((state) => state.setBuyNowItem);

  const { data: user } = userStore();
  const { addItem, removeItem, wishlist } = wishlistStore();

  const [wishlisted, setWishlisted] = useState(false);
  const [productImage, setProductImage] = useState(fallbackImage);

  useEffect(() => {
    try {
      if (img && img.trim() !== "") {
        setProductImage(img);
      } else {
        setProductImage(fallbackImage);
      }
    } catch (err) {
      console.error("Error loading product image:", err);
      setProductImage(fallbackImage);
    }
  }, [img]);

  useEffect(() => {
    setWishlisted(wishlist.some((w) => w.id === id));
  }, [wishlist, id]);

  const handleEdit = () => {
    navigate(`/admin/products/edit/${id}`);
  };

  const handleAddToCart = () => {
    if (!enabled) return;
    addToCart({
      id,
      name,
      price: finalPrice,
      image: productImage,
    });
  };

  const handleBuyNow = () => {
    if (!enabled) return;
    setBuyNowItem({
      id,
      name,
      price: finalPrice,
      image: productImage,
      discount,
    });
    navigate("/checkout");
  };

  const handleWishlistToggle = async () => {
    if (!user || !user.uid) {
      alert("Please login to use wishlist.");
      return;
    }
    if (!enabled) return;

    const item = {
      id,
      name,
      price: finalPrice,
      discount,
      image: productImage,
    };

    try {
      if (wishlisted) {
        await removeItem(user.uid, id);
        setWishlisted(false);
        alert("Product removed from wishlist successfully");
      } else {
        await addItem(user.uid, item);
        setWishlisted(true);
        alert("Product added to wishlist successfully");
      }
    } catch (err) {
      alert("Failed to update wishlist.");
      console.error(err);
    }
  };

  const handleOpenDetails = () => {
    navigate(`/product/${id}`, {
      state: {
        product: {
          id,
          name,
          price,
          finalPrice,
          discount,
          rating,
          image: productImage,
          description: "",
        },
      },
    });
  };

  return (
    <div
      className={`w-full bg-white rounded-lg shadow-md p-4 relative border border-gray-300 transform transition duration-300 hover:shadow-lg hover:scale-[1.02] ${
        !enabled ? "opacity-50" : ""
      }`}
    >
      <div className="absolute top-2 left-0 bg-secondary text-white text-xs font-bold px-2 py-1 rounded-tr-lg rounded-bl-lg">
        -{discount}%
      </div>

      {!isAdmin && (
        <button
          onClick={handleWishlistToggle}
          className="absolute top-2 right-2 text-gray-500 hover:text-secondary transition-colors duration-300"
          aria-label="Add to Wishlist"
          disabled={!enabled}
        >
          <Heart
            className={`w-5 h-5 ${
              wishlisted ? "fill-red-500 text-red-500" : ""
            }`}
          />
        </button>
      )}

      <div
        onClick={handleOpenDetails}
        className={`cursor-pointer ${!enabled ? "pointer-events-none" : ""}`}
      >
        <img
          src={productImage}
          alt={name}
          className="w-full h-40 object-contain mb-4"
          onError={() => setProductImage(fallbackImage)}
        />
        <h2 className="text-sm font-semibold truncate hover:underline leading-snug mb-2 w-48">
          {name}
        </h2>
      </div>

      <div className="flex space-x-1 text-yellow-500 text-sm mb-2">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? "fill-yellow-500" : "fill-gray-300 text-gray-300"
            }`}
          />
        ))}
      </div>

      <div className="mb-2">
        <span className="line-through text-gray-500 text-sm">
          Rs. {price}
        </span>{" "}
        <span className="text-xl font-bold text-secondary">
          Rs. {finalPrice}
        </span>
        <p className="text-sm text-gray-700 mt-1">
          or ₹1208 +{" "}
          <span className="text-secondary font-medium">64 rc coins</span>
        </p>
        <p className="text-xs text-gray-500">
          Incl. GST (No Hidden Charges)
        </p>
      </div>

      <div className="flex gap-2 mt-4 flex-col">
        {isAdmin ? (
          <>
            <div className="flex gap-2">
              <button
                onClick={() => navigate("/admin/products/delete")}
                className="flex-1 bg-red-600 text-white text-sm px-4 py-2 rounded hover:bg-red-700 transition-transform duration-150 active:scale-95"
              >
                Delete
              </button>
              <button
                onClick={handleEdit}
                className="flex-1 border border-blue-600 text-blue-600 text-sm px-4 py-2 rounded hover:bg-blue-50 transition-transform duration-150 active:scale-95"
              >
                Edit
              </button>
            </div>
            <button
              onClick={onToggleStatus}
              className={`mt-2 w-full text-xs py-1 rounded text-white ${
                enabled
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {enabled ? "Disable" : "Enable"}
            </button>
          </>
        ) : (
          <div className="flex gap-2">
            <button
              className={`flex-1 text-sm px-4 py-2 rounded transition-transform duration-150 active:scale-95 hover:shadow-md ${
                enabled
                  ? "bg-black text-white hover:bg-gray-800"
                  : "bg-gray-400 text-gray-700 cursor-not-allowed"
              }`}
              onClick={handleAddToCart}
              disabled={!enabled}
            >
              Add To Cart
            </button>
            <button
              className={`flex-1 border text-sm px-4 py-2 rounded transition-transform duration-150 active:scale-95 hover:shadow-md ${
                enabled
                  ? "border-gray-300 hover:bg-gray-100 hover:border-secondary"
                  : "border-gray-300 bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
              onClick={handleBuyNow}
              disabled={!enabled}
            >
              Buy Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemCard;
  