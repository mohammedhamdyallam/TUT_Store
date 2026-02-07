"use client";
// NextJs
import Image from "next/image";
import Link from "next/link";

// Context
import { useCart } from "@/contexts/cartContext";

export default function Product({
  product,
  id,
  title,
  category,
  price,
  discount,
  originalPrice,
}) {
  const { addToCart } = useCart();

  return (
    <div className="group bg-white rounded-3xl border border-gray-100 p-5 hover:shadow-2xl transition-all duration-500 overflow-hidden relative">
      {/* Discount */}
      {discount && (
        <div className="absolute top-4 left-4 z-10 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
          -{discount}%
        </div>
      )}

      {/* Product Link */}
      <Link href={`products/${id}`} className="cursor-pointer">
        {/* Product Img */}
        <div className="relative w-full h-64 md:h-72 rounded-2xl overflow-hidden mb-5">
          <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </div>

        {/* Product Info */}
        <div className="px-2">
          <div className="flex justify-between items-start mb-2">
            <div>
              <span className="text-xs text-gray-500 uppercase tracking-wider">
                {category === "shoes" ? "أحذية" : "اكسسوارات"}
              </span>
              <h3 className="font-semibold text-lg text-gray-900 group-hover:text-[#6BB7C7] transition-colors mt-1">
                {title}
              </h3>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mb-5">
            <p className="text-xl font-bold text-gray-900">{price} ج.م</p>
            {originalPrice && (
              <p className="text-gray-400 line-through text-sm">
                {originalPrice} ج.م
              </p>
            )}
          </div>
        </div>
      </Link>

      {/* Add to cart button (outside Link) */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          addToCart(product);
        }}
        className="w-full py-3.5 rounded-xl border-2 border-[#6BB7C7] text-[#6BB7C7] font-medium hover:bg-gradient-to-r hover:from-[#6BB7C7] hover:to-[#4CA1AF] hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
      >
        <span>إضافة للسلة</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 transition-transform"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </button>
    </div>
  );
}
