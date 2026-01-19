"use client";
// NextJs & React
import { useState } from "react";

// Comps
import Product from "@/comps/mini-comps/product";

const products = [
  {
    id: 1,
    name: "Elegant Women Shoes",
    price: "EGP 1,200",
    originalPrice: "EGP 1,500",
    category: "shoes",
    image: "/products/shoe1.jpg",
    discount: 20,
  },
  {
    id: 2,
    name: "Classic Leather Bag",
    price: "EGP 1,450",
    category: "bags",
    image: "/products/bag1.jpg",
    featured: true,
  },
  {
    id: 3,
    name: "Modern Sneakers",
    price: "EGP 1,100",
    originalPrice: "EGP 1,350",
    category: "shoes",
    image: "/products/shoe2.jpg",
    discount: 18,
  },
  {
    id: 4,
    name: "Elegant Hand Bag",
    price: "EGP 1,600",
    category: "bags",
    image: "/products/bag2.jpg",
    featured: true,
  },
  {
    id: 5,
    name: "Evening Heels",
    price: "EGP 1,800",
    category: "shoes",
    image: "/products/shoe3.jpg",
  },
  {
    id: 6,
    name: "Casual Tote Bag",
    price: "EGP 1,250",
    originalPrice: "EGP 1,550",
    category: "bags",
    image: "/products/bag3.jpg",
    discount: 19,
  },
  {
    id: 7,
    name: "Comfort Sandals",
    price: "EGP 950",
    category: "shoes",
    image: "/products/shoe4.jpg",
  },
  {
    id: 8,
    name: "Mini Crossbody Bag",
    price: "EGP 1,350",
    category: "bags",
    image: "/products/bag4.jpg",
  },
];

export default function Products() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <main className="min-h-screen bg-linear-to-b from-white to-[#F5F9FA] px-4 md:px-8 lg:px-16 py-14">
      {/* Page Header */}
      <section className="text-center max-w-4xl mx-auto mb-20">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900">
          Products
        </h1>

        <div className="w-28 h-1 bg-linear-to-r from-[#6BB7C7] to-[#4CA1AF] mx-auto mt-6 rounded-full"></div>
      </section>

      {/* Filters + Search */}
      <section className="mb-16">
        <div className="bg-white rounded-3xl shadow-md border border-gray-200 px-6 py-5 flex flex-col lg:flex-row gap-6 items-center justify-between">
          {/* Left Side: Search + Filter */}
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            {/* Search Bar */}
            <div className="relative w-full sm:w-80">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 text-sm rounded-full border border-gray-300
                     focus:outline-none focus:ring-2 focus:ring-[#6BB7C7]/40
                     focus:border-[#6BB7C7] transition"
              />
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 103.5 3.5a7.5 7.5 0 0013.15 13.15z"
                />
              </svg>
            </div>

            {/* Filter Button */}
            <div className="relative">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 px-6 py-3 rounded-full border border-gray-300
                     text-gray-700 font-medium hover:bg-gray-50
                     focus:outline-none focus:ring-2 focus:ring-[#6BB7C7]/40 transition"
              >
                <svg
                  className="w-5 h-5 text-[#6BB7C7]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L14 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 018 21v-7.586L3.293 6.707A1 1 0 013 6V4z"
                  />
                </svg>
                Filter
              </button>

              {/* Filter Dropdown */}
              {isFilterOpen && (
                <div className="absolute left-0 mt-3 w-64 bg-white rounded-2xl shadow-lg border border-gray-200 p-4 z-20">
                  <h4 className="font-semibold text-gray-800 mb-3">
                    Filter By
                  </h4>

                  {/* Category */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      Category
                    </label>
                    <select
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm
                           focus:outline-none focus:ring-2 focus:ring-[#6BB7C7]/40"
                    >
                      <option value="">All</option>
                      <option value="shoes">Shoes</option>
                      <option value="bags">Bags</option>
                    </select>
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      Sort By Price
                    </label>
                    <select
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm
                           focus:outline-none focus:ring-2 focus:ring-[#6BB7C7]/40"
                    >
                      <option value="">Default</option>
                      <option value="low">Low to High</option>
                      <option value="high">High to Low</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Side: Products Count */}
          <div className="text-sm text-gray-600">
            Showing{" "}
            <span className="font-bold text-gray-900">
              {filteredProducts.length}
            </span>{" "}
            products
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {filteredProducts.map((product) => (
          <Product
            key={product.id}
            product={product}
            id={product.id}
            name={product.name}
            category={product.category}
            price={product.price}
            discount={product.discount}
            originalPrice={product.originalPrice}
          />
        ))}
      </section>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-20">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#6BB7C7]/10 flex items-center justify-center">
            <svg
              className="h-12 w-12 text-[#6BB7C7]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <h3 className="text-xl font-bold text-gray-700 mb-2">
            No products found
          </h3>

          <p className="text-gray-500 mb-6">
            Try searching with a different keyword
          </p>

          <button
            onClick={() => setSearchQuery("")}
            className="px-6 py-3 rounded-full bg-[#6BB7C7] text-white font-medium hover:bg-[#5aa5b5] transition"
          >
            View All Products
          </button>
        </div>
      )}
    </main>
  );
}