// Next Js
import Product from "@/comps/mini-comps/product";
import Image from "next/image";
import Link from "next/link";

// Get Products
async function getProducts() {
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("API Error:", res.status);
    return null;
  }

  const text = await res.text();
  if (!text) return null;

  return JSON.parse(text);
}

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-[#F9FAFB] text-gray-800">
      {/* Hero */}
      <section className="flex flex-col items-center text-center px-6 py-24">
        <Image src="/logo.png" alt="TUT" width={300} height={300} />
        <h2 className="mt-6 text-4xl md:text-5xl font-serif font-bold">
          أحذية وحقائب نسائية
        </h2>
        <p className="mt-4 max-w-xl text-gray-600">
          تصاميم أنيقة مستوحاة من الطبيعة، صُنعت للمرأة العصرية التي تقدر
          الراحة والأناقة.
        </p>
        <Link
          href="/products?page=1"
          className="mt-8 px-10 py-3 rounded-full bg-[#6BB7C7] text-white font-medium tracking-wide hover:opacity-90"
        >
          تسوقي المجموعة
        </Link>
      </section>

      {/* Products */}
      <section id="products" className="px-6 md:px-12 py-20">
        {/* Heading */}
        <div className="text-center mb-14">
          <h3 className="text-3xl md:text-4xl font-serif font-bold text-gray-800">
            مجموعتنا
          </h3>
          <div className="mt-3 w-20 h-1 mx-auto rounded-full bg-[#6BB7C7]" />
        </div>

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

        {/* CTA */}
        <div className="flex justify-center mt-14">
          <Link
            href="/products?page=1"
            className="inline-flex items-center gap-2 px-10 py-3 rounded-full
                 bg-[#6BB7C7] text-white font-medium tracking-wide
                 shadow-md hover:shadow-lg hover:bg-[#5AA9B8]
                 transition-all duration-300"
          >
            تسوقي المزيد
          </Link>
        </div>
      </section>
    </main>
  );
}
