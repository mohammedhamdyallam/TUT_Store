// NextJs
import Image from "next/image";

// Icons
import { FiSave } from "react-icons/fi";

// Get Products Data Fetching
async function getProduct(id) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
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

// Dynamic Metadata
export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return {
      title: "Product Not Found | TUT",
      description: "Product not found",
    };
  }

  return {
    title: `${product.title} | TUT`,
    description: product.description,
  };
}

export default async function ProductInfo({ params }) {
  const { id } = await params;
  const product = await getProduct(id);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Product Image */}
        <div className="bg-gray-50 rounded-2xl p-6 flex items-center justify-center">
          <Image
            src={product.image}
            alt={product.title}
            className="max-h-105 object-contain"
            height={"105"}
            width={"105"}
          />
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">
            {product.title}
          </h1>

          <p className="mt-4 text-gray-600 leading-relaxed">
            {product.description}
          </p>

          <div className="mt-6 flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-900">
              ${product.price}
            </span>

            <span className="text-sm text-gray-500">In stock</span>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-200 my-8" />

          {/* Actions */}
          <div className="flex gap-4">
            <button className="flex-1 bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition">
              Add to Cart
            </button>

            <button className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100 transition">
              <FiSave />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
