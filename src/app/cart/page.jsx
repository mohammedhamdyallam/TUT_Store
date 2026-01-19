"use client";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQty, clearCart } from "@/store/slices/cartSlice";
import Image from "next/image";
import {
  FiTrash2,
  FiPlus,
  FiMinus,
  FiShoppingBag,
  FiArrowLeft,
  FiTag,
} from "react-icons/fi";
import { HiOutlineShoppingCart } from "react-icons/hi";
import Link from "next/link";
import { useState } from "react";

export default function Cart() {
  // Redux
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  // State
  const [isLoading, setIsLoading] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal + shipping;

  const handleCheckout = async () => {
    setIsLoading(true);
    // Simulate checkout process
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    // Handle checkout logic here
  };

  const getProductImage = (id) => {
    const images = [
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=800",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w-800",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800",
    ];
    return images[id % images.length];
  };

  const CartItem = ({ item }) => (
    <div className="flex flex-col sm:flex-row gap-6 p-6 bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300">
      {/* Product Image */}
      <div className="relative w-full sm:w-32 h-32 rounded-xl overflow-hidden bg-gray-100">
        <Image
          src={getProductImage(item.id)}
          alt={item.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center">
          <button
            onClick={() => dispatch(removeFromCart(item.id))}
            className="text-gray-600 hover:text-red-500 transition"
          >
            <FiTrash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h3 className="font-semibold text-lg text-gray-900">
                {item.name}
              </h3>
              {item.qty >= 3 && (
                <span className="px-2 py-1 bg-[#6BB7C7]/10 text-[#6BB7C7] text-xs rounded-full">
                  Bulk Purchase
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600">
              Category: {item.category || "Fashion"}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-gray-900">
                EGP {item.price}
              </span>
              {item.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  EGP {item.originalPrice}
                </span>
              )}
            </div>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-2">
              <button
                onClick={() =>
                  item.qty > 1 &&
                  dispatch(updateQty({ id: item.id, qty: item.qty - 1 }))
                }
                className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  item.qty > 1
                    ? "bg-white text-gray-700 hover:bg-gray-100"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                } transition`}
                disabled={item.qty === 1}
              >
                <FiMinus className="w-4 h-4" />
              </button>
              <span className="w-10 text-center font-bold text-gray-900">
                {item.qty}
              </span>
              <button
                onClick={() =>
                  dispatch(updateQty({ id: item.id, qty: item.qty + 1 }))
                }
                className="w-8 h-8 rounded-lg bg-white text-gray-700 hover:bg-gray-100 transition flex items-center justify-center"
              >
                <FiPlus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Item Total */}
        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Unit Price: <span className="font-medium">EGP {item.price}</span>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Item Total</p>
            <p className="text-xl font-bold text-gray-900">
              EGP {item.price * item.qty}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F9FAFB] px-4 md:px-8 lg:px-16 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#6BB7C7] transition mb-6"
          >
            <FiArrowLeft className="w-5 h-5" />
            Continue Shopping
          </Link>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl font-serif font-bold text-gray-900">
                Your Shopping Cart
              </h1>
              <p className="mt-2 text-gray-600">
                Review your items and proceed to checkout
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-white rounded-xl border border-gray-200">
                <span className="text-sm text-gray-600">Items in cart:</span>
                <span className="ml-2 font-bold text-gray-900">
                  {cart.length}
                </span>
              </div>
              <button
                onClick={() => dispatch(clearCart())}
                className="px-4 py-2 text-red-500 hover:bg-red-50 rounded-xl transition flex items-center gap-2"
                disabled={cart.length === 0}
              >
                <FiTrash2 className="w-5 h-5" />
                Clear All
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items Section */}
          <div className="lg:col-span-2 space-y-6">
            {cart.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                  <HiOutlineShoppingCart className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-700 mb-3">
                  Your cart is empty
                </h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Looks like you haven't added any items to your cart yet. Start
                  shopping to discover our collection.
                </p>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-[#6BB7C7] to-[#4CA1AF] text-white font-medium hover:shadow-lg hover:shadow-[#6BB7C7]/30 transition"
                >
                  <FiShoppingBag className="w-5 h-5" />
                  Browse Products
                </Link>
              </div>
            ) : (
              <>
                {cart.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}

                {/* Promo Code */}
                <div className="bg-linear-to-r from-[#6BB7C7]/10 to-[#4CA1AF]/10 rounded-2xl p-6">
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-white">
                        <FiTag className="w-6 h-6 text-[#6BB7C7]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">
                          Have a promo code?
                        </h4>
                        <p className="text-sm text-gray-600">
                          Enter your code for discounts
                        </p>
                      </div>
                    </div>
                    <div className="flex-1 flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter promo code"
                        className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#6BB7C7] focus:ring-2 focus:ring-[#6BB7C7]/20"
                      />
                      <button className="px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition">
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Order Summary
                </h2>

                {/* Summary Items */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">
                      EGP {subtotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span
                      className={`font-medium ${
                        shipping === 0 ? "text-green-600" : ""
                      }`}
                    >
                      {shipping === 0 ? "FREE" : `EGP ${shipping.toFixed(2)}`}
                    </span>
                  </div>

                  {shipping > 0 && (
                    <div className="text-sm text-gray-500 bg-blue-50 p-3 rounded-lg">
                      <p>
                        Add{" "}
                        <span className="font-bold">
                          EGP {(100 - subtotal).toFixed(2)}
                        </span>{" "}
                        more for free shipping!
                      </p>
                    </div>
                  )}
                </div>

                {/* Total */}
                <div className="border-t border-gray-200 pt-6 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">
                      Total
                    </span>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">
                        EGP {total.toFixed(2)}
                      </div>
                      <p className="text-sm text-gray-500">Including VAT</p>
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  disabled={cart.length === 0 || isLoading}
                  className={`w-full py-4 rounded-xl font-bold text-white transition-all duration-300 ${
                    cart.length === 0
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-gradient-to-r from-[#6BB7C7] to-[#4CA1AF] hover:shadow-xl hover:shadow-[#6BB7C7]/30 hover:scale-[1.02]"
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </div>
                  ) : (
                    `Proceed to Checkout (${cart.length} ${
                      cart.length === 1 ? "item" : "items"
                    })`
                  )}
                </button>

                {/* Payment Methods */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-3">
                    Secure payment with
                  </p>
                  <div className="flex items-center gap-3">
                    {["Visa", "MasterCard", "PayPal", "COD"].map((method) => (
                      <div
                        key={method}
                        className="px-3 py-2 bg-gray-100 rounded-lg"
                      >
                        <span className="text-sm font-medium text-gray-700">
                          {method}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Security Note */}
                <div className="mt-6 p-4 bg-green-50 rounded-xl">
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-green-600 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="text-sm text-green-800">
                      Your payment information is encrypted and secure. We never
                      store your credit card details.
                    </p>
                  </div>
                </div>
              </div>

              {/* Continue Shopping */}
              <div className="mt-6 text-center">
                <p className="text-gray-600 mb-4">Not ready to checkout?</p>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-[#6BB7C7] text-[#6BB7C7] hover:bg-[#6BB7C7] hover:text-white transition"
                >
                  <FiShoppingBag className="w-5 h-5" />
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Recently Viewed Section */}
        {cart.length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              You might also like
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-lg transition"
                >
                  <div className="relative w-full h-48 rounded-xl overflow-hidden bg-gray-100 mb-4">
                    <Image
                      src={`https://images.unsplash.com/photo-${
                        item === 1
                          ? "1543163521-1bf539c55dd2"
                          : item === 2
                          ? "1591561954557"
                          : item === 3
                          ? "1549298916"
                          : "1595341885426"
                      }?q=80&w=800`}
                      alt="Related Product"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h4 className="font-medium text-gray-900">
                    Elegant Evening Bag
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">EGP 1,850</p>
                  <button className="w-full mt-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:border-[#6BB7C7] hover:text-[#6BB7C7] transition">
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
