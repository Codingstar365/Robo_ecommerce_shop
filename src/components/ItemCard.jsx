import React, { useState, useEffect } from "react";
import { Star, Heart } from "lucide-react";
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
  onToggleStatus,
}) => {
  const finalPrice = Math.round(price * (1 - discount / 100));
  const navigate = useNavigate();

  const addToCart = useCartStore((state) => state.addToCart);
  const setBuyNowItem = useCartStore((state) => state.setBuyNowItem);

  const { data: user } = userStore();
  const { addItem, removeItem, wishlist } = wishlistStore();

  const [wishlisted, setWishlisted] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);

  useEffect(() => {
    setWishlisted(wishlist.some((w) => w.id === id));
  }, [wishlist, id]);

  const handleEdit = () => navigate(`/admin/products/edit/${id}`);

  const handleAddToCart = () => {
    if (!enabled) return;
    addToCart({ id, name, price: finalPrice, image: img });
  };

  const handleBuyNow = () => {
    if (!enabled) return;
    setBuyNowItem({ id, name, price: finalPrice, image: img, discount });
    navigate("/checkout");
  };

  const handleWishlistToggle = async (e) => {
    e.stopPropagation();
    if (!user || !user.uid) {
      alert("Please login to use wishlist.");
      return;
    }
    if (!enabled) return;

    const item = { id, name, price: finalPrice, discount, image: img };
    try {
      if (wishlisted) {
        await removeItem(user.uid, id);
        setWishlisted(false);
      } else {
        await addItem(user.uid, item);
        setWishlisted(true);
      }
    } catch (err) {
      console.error("Wishlist update failed:", err);
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
          image: img,
          description: "",
        },
      },
    });
  };

  return (
    <div
      className={`w-full rounded-xl border border-gray-200 shadow-sm bg-white relative 
      overflow-hidden transform transition duration-300 
      hover:shadow-lg hover:-translate-y-1 ${
        !enabled ? "opacity-60" : ""
      }`}
    >
      {/* Image & Discount Badge */}
      <div
        onClick={handleOpenDetails}
        className={`cursor-pointer relative ${!enabled ? "pointer-events-none" : ""}`}
      >
        {/* Shimmer Loader */}
        {isImageLoading && (
          <div className="absolute inset-0 animate-pulse bg-gray-200 rounded-t-xl" />
        )}

        <img
          src={img}
          alt={name}
          className={`w-full h-44 object-cover rounded-t-xl transition-opacity duration-500 ${
            isImageLoading ? "opacity-0" : "opacity-100"
          }`}
          onLoad={() => setIsImageLoading(false)}
          onError={(e) => {
            setIsImageLoading(false);
            e.currentTarget.src =
              "https://via.placeholder.com/300x200.png?text=No+Image";
          }}
        />

        {/* Discount Tag */}
        {discount > 0 && (
          <div className="absolute top-2 left-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded-md shadow">
            -{discount}%
          </div>
        )}

        {/* Wishlist Button */}
        {!isAdmin && (
          <button
            onClick={handleWishlistToggle}
            className="absolute top-2 right-2 p-1 bg-white/80 backdrop-blur-sm rounded-full shadow hover:scale-110 transition"
            aria-label="Add to Wishlist"
            disabled={!enabled}
          >
            <Heart
              className={`w-5 h-5 ${
                wishlisted ? "fill-red-500 text-red-500" : "text-gray-500"
              }`}
            />
          </button>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4">
        {/* Title */}
        <h2 className="text-sm font-semibold truncate hover:underline">
          {name}
        </h2>

        {/* Rating */}
        <div className="flex space-x-1 text-yellow-400 text-sm my-1">
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < rating ? "fill-yellow-400" : "fill-gray-200 text-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Pricing */}
        <div className="mt-2">
          <span className="line-through text-gray-400 text-xs">
            Rs. {price}
          </span>{" "}
          <span className="text-lg font-bold text-secondary">
            Rs. {finalPrice}
          </span>
          <p className="text-xs text-gray-500 mt-1">
            Incl. GST · No Hidden Charges
          </p>
        </div>

        {/* Actions */}
        <div className="mt-4 flex flex-col gap-2">
          {isAdmin ? (
            <>
              <div className="flex gap-2">
                <button
                  onClick={() => navigate("/admin/products/delete")}
                  className="flex-1 bg-red-600 text-white text-xs px-3 py-2 rounded hover:bg-red-700 active:scale-95"
                >
                  Delete
                </button>
                <button
                  onClick={handleEdit}
                  className="flex-1 border border-blue-600 text-blue-600 text-xs px-3 py-2 rounded hover:bg-blue-50 active:scale-95"
                >
                  Edit
                </button>
              </div>
              <button
                onClick={onToggleStatus}
                className={`mt-2 w-full text-xs py-1 rounded text-white transition ${
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
                onClick={handleAddToCart}
                disabled={!enabled}
                className={`flex-1 text-xs px-3 py-2 rounded transition active:scale-95 hover:shadow ${
                  enabled
                    ? "bg-black text-white hover:bg-gray-800"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Add To Cart
              </button>
              <button
                onClick={handleBuyNow}
                disabled={!enabled}
                className={`flex-1 border text-xs px-3 py-2 rounded transition active:scale-95 hover:shadow ${
                  enabled
                    ? "border-gray-300 hover:bg-gray-100 hover:border-secondary"
                    : "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                Buy Now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
