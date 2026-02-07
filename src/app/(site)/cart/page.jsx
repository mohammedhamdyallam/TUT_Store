"use client";

// NextJs
import Image from "next/image";
import Link from "next/link";

// React
import { useState } from "react";

// Icons
import {
  FiTrash2,
  FiPlus,
  FiMinus,
  FiShoppingBag,
  FiArrowRight,
  FiTag,
} from "react-icons/fi";
import { HiOutlineShoppingCart } from "react-icons/hi";

// Context
import { useCart } from "@/contexts/cartContext";
import { redirect } from "next/navigation";

export default function Cart() {
  const { cart, removeFromCart, updateQty, clearCart } = useCart();

  const [isLoading, setIsLoading] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal + shipping;

  const handleCheckout = async () => {
    redirect("/cart/checkout")
  };

  const CartItem = ({ item }) => (
    <div className="flex flex-col sm:flex-row gap-6 p-6 bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300">
      <div className="relative w-full sm:w-32 h-32 rounded-xl overflow-hidden bg-gray-100">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-500"
        />
        <div className="absolute top-2 left-2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center">
          <button
            onClick={() => removeFromCart(item.id)}
            className="text-gray-600 hover:text-red-500 transition"
          >
            <FiTrash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h3 className="font-semibold text-lg text-gray-900">
                {item.title}
              </h3>
              {item.qty >= 3 && (
                <span className="px-2 py-1 bg-[#6BB7C7]/10 text-[#6BB7C7] text-xs rounded-full">
                  شراء بالجملة
                </span>
              )}
            </div>

            <p className="text-sm text-gray-600">
              القسم:{" "}
              {item.category === "shoes" ? "أحذية" : "اكسسوارات" || "موضة"}
            </p>

            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-gray-900">
                {item.price} ج.م
              </span>
              {item.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  {item.originalPrice} ج.م
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-2">
              <button
                onClick={() => item.qty > 1 && updateQty(item.id, item.qty - 1)}
                className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.qty > 1
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
                onClick={() => updateQty(item.id, item.qty + 1)}
                className="w-8 h-8 rounded-lg bg-white text-gray-700 hover:bg-gray-100 transition flex items-center justify-center"
              >
                <FiPlus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            سعر الوحدة: <span className="font-medium">{item.price} ج.م</span>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">الإجمالي</p>
            <p className="text-xl font-bold text-gray-900">
              {item.price * item.qty} ج.م
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-linear-to-b from-white to-[#F9FAFB] px-4 md:px-8 lg:px-16 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#6BB7C7] transition mb-6"
          >
            <FiArrowRight className="w-5 h-5" />
            متابعة التسوق
          </Link>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl font-serif font-bold text-gray-900">
                عربة التسوق
              </h1>
              <p className="mt-2 text-gray-600">
                راجع منتجاتك وأكمل عملية الشراء
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-white rounded-xl border border-gray-200">
                <span className="text-sm text-gray-600">
                  المنتجات في العربة:
                </span>
                <span className="mr-2 font-bold text-gray-900">
                  {cart.length}
                </span>
              </div>

              <button
                onClick={clearCart}
                className="px-4 py-2 text-red-500 hover:bg-red-50 rounded-xl transition flex items-center gap-2"
                disabled={cart.length === 0}
              >
                <FiTrash2 className="w-5 h-5" />
                حذف الكل
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {cart.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                  <HiOutlineShoppingCart className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-700 mb-3">
                  عربة التسوق فارغة
                </h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  يبدو أنك لم تضف أي منتجات إلى عربة التسوق الخاصة بك حتى الآن.
                </p>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-linear-to-r from-[#6BB7C7] to-[#4CA1AF] text-white font-medium"
                >
                  <FiShoppingBag className="w-5 h-5" />
                  تصفح المنتجات
                </Link>
              </div>
            ) : (
              cart.map((item) => <CartItem key={item.id} item={item} />)
            )}
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6 h-fit">
            <h2 className="text-2xl font-bold mb-6">ملخص الطلب</h2>

            <div className="flex justify-between mb-3">
              <span>المجموع الفرعي</span>
              <span>{subtotal.toFixed(2)} ج.م</span>
            </div>

            <div className="flex justify-between mb-6">
              <span>الشحن</span>
              <span className={shipping === 0 ? "text-green-600" : ""}>
                {shipping === 0 ? "مجاني" : `${shipping} ج.م`}
              </span>
            </div>

            <div className="flex justify-between text-xl font-bold mb-6">
              <span>الإجمالي</span>
              <span>{total.toFixed(2)} ج.م</span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={cart.length === 0 || isLoading}
              className="w-full py-4 rounded-xl font-bold text-white bg-linear-to-r from-[#6BB7C7] to-[#4CA1AF]"
            >
              {isLoading ? "جاري المعالجة..." : "إتمام الشراء"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
