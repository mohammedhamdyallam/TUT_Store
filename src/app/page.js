"use client";
// Next Js
import Product from "@/comps/mini-comps/product";
import Image from "next/image";
import Link from "next/link";

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

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F9FAFB] text-gray-800">
      {/* Hero */}
      <section className="flex flex-col items-center text-center px-6 py-24">
        <Image src="/logo.png" alt="TUT" width={300} height={300} />
        <h2 className="mt-6 text-4xl md:text-5xl font-serif font-bold">
          WOMEN SHOES & BAGS
        </h2>
        <p className="mt-4 max-w-xl text-gray-600">
          Elegant designs inspired by nature, made for modern women who value
          comfort and style.
        </p>
        <Link
          href="/products"
          className="mt-8 px-10 py-3 rounded-full bg-[#6BB7C7] text-white font-medium tracking-wide hover:opacity-90"
        >
          SHOP COLLECTION
        </Link>
      </section>

      {/* Products */}
      <section id="products" className="px-8 py-20">
        <h3 className="text-center text-3xl font-serif font-bold mb-12">
          Our Collection
        </h3>
        {/* Products Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
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
      </section>
    </main>
  );
}
