"use client";
import Image from "next/image";
import { useState } from "react";
import { FiX } from "react-icons/fi";

export default function Admin() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Classic Heels",
      category: "Shoes",
      price: 250,
      discount: 10,
      originalPrice: 280,
    },
    {
      id: 2,
      name: "Elegant Bag",
      category: "Bags",
      price: 180,
      discount: 5,
      originalPrice: 190,
    },
  ]);

  // State
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const [form, setForm] = useState({
    id: null,
    name: "",
    category: "",
    price: "",
    discount: "",
    originalPrice: "",
    stock: "",
    image: null,
    imagePreview: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  // Filter products
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Add product
  const addProduct = () => {
    const newProduct = {
      ...form,
      id: Date.now(),
      price: Number(form.price),
      discount: Number(form.discount),
      originalPrice: Number(form.originalPrice),
    };

    setProducts([newProduct, ...products]);
    resetForm();
  };

  // Update product
  const updateProduct = () => {
    setProducts(
      products.map((p) =>
        p.id === form.id
          ? {
              ...form,
              price: Number(form.price),
              discount: Number(form.discount),
              originalPrice: Number(form.originalPrice),
            }
          : p,
      ),
    );
    resetForm();
    setIsEditing(false);
  };

  // Edit
  const editProduct = (product) => {
    setForm(product);
    setIsEditing(true);
  };

  // Delete
  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const resetForm = () => {
    setForm({
      id: null,
      name: "",
      category: "",
      price: "",
      discount: "",
      originalPrice: "",
    });
  };

  return (
    <>
      <main className="min-h-screen bg-linear-to-b from-white to-[#F5F9FA] px-4 md:px-8 lg:px-16 py-14">
        {/* Header */}
        <section className="text-center max-w-4xl mx-auto mb-10">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900">
            Admin Dashboard
          </h1>
          <p className="mt-4 text-gray-600">Add, edit or delete products.</p>
        </section>

        {/* Search + Add */}
        <section className="mb-10">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="relative w-full lg:w-96">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 text-sm rounded-full border border-gray-300
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

            <button
              onClick={() => {
                setIsAddProductModalOpen(!isAddProductModalOpen);
              }}
              className="px-6 py-3 rounded-full bg-[#6BB7C7] text-white font-medium hover:bg-[#5aa5b5] transition"
            >
              New Product
            </button>
          </div>
        </section>

        {/* Products List */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6"
              >
                <div>
                  <Image
                    src={"https://th.bing.com/th/id/R.d47a93c9dd5190e508ba2f9adbb63c46?rik=PazQ34iNKO1n1w&riu=http%3a%2f%2fwww.tennisnuts.com%2fimages%2fproduct%2ffull%2fNIKE-FREE-50-642198_406_E_PREM.jpg&ehk=axULOEnKIEkYe6JKCX23HSV162H2xSRTqrO8sEGIuJQ%3d&risl=&pid=ImgRaw&r=0"}
                    alt="product image"
                    height={200}
                    width={200}
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Category: {product.category}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Price: ${product.price}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Discount: {product.discount}%
                </p>

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => editProduct(product)}
                    className="flex-1 px-4 py-2 rounded-full border border-[#6BB7C7] text-[#6BB7C7] font-medium hover:bg-[#6BB7C7]/10 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="flex-1 px-4 py-2 rounded-full bg-red-500 text-white font-medium hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20 text-gray-500">
              No products found.
            </div>
          )}
        </section>
      </main>

      {/* Add / Edit Product Modal */}
      {isAddProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setIsAddProductModalOpen(false)}
          />

          {/* Modal */}
          <div className="relative z-50 w-full max-w-2xl mx-4 bg-white rounded-3xl shadow-xl border border-gray-200 p-6 md:p-8 animate-fadeIn">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {isEditing ? "Edit Product" : "Add Product"}
              </h2>

              <button
                onClick={() => {
                  setIsAddProductModalOpen(false);
                  resetForm();
                  setIsEditing(false);
                }}
                className="w-9 h-9 rounded-full flex items-center justify-center
                  text-gray-500 hover:bg-gray-100 transition"
              >
                <FiX size={30} />
              </button>
            </div>

            {/* Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-1">
              {/* Image Upload */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Image
                </label>

                <div className="flex items-center gap-4">
                  <label
                    className="cursor-pointer px-6 py-3 rounded-full border border-dashed
                      border-gray-300 text-sm text-gray-600 hover:bg-gray-50 transition"
                  >
                    Upload Image
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (!file) return;

                        setForm({
                          ...form,
                          image: file,
                          imagePreview: URL.createObjectURL(file),
                        });
                      }}
                    />
                  </label>

                  {form.imagePreview && (
                    <div className="relative">
                      <Image
                        src={form.imagePreview}
                        alt="Preview"
                        className="w-20 h-20 rounded-xl object-cover border border-gray-200"
                        height={"20"}
                        width={"20"}
                      />
                      <button
                        onClick={() =>
                          setForm({ ...form, image: null, imagePreview: "" })
                        }
                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500
                       text-white text-xs flex items-center justify-center"
                      >
                        <FiX />
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Product Name */}
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Product name"
                className="w-full px-4 py-3 rounded-xl border border-gray-300
                  focus:outline-none focus:ring-2 focus:ring-[#6BB7C7]/40
                focus:border-[#6BB7C7] transition"
              />

              {/* Category */}
              <input
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                placeholder="Category"
                className="w-full px-4 py-3 rounded-xl border border-gray-300
                  focus:outline-none focus:ring-2 focus:ring-[#6BB7C7]/40
                focus:border-[#6BB7C7] transition"
              />

              {/* Price */}
              <input
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="Price"
                type="number"
                className="w-full px-4 py-3 rounded-xl border border-gray-300
                  focus:outline-none focus:ring-2 focus:ring-[#6BB7C7]/40
                focus:border-[#6BB7C7] transition"
              />

              {/* Discount */}
              <input
                value={form.discount}
                onChange={(e) => setForm({ ...form, discount: e.target.value })}
                placeholder="Discount (%)"
                type="number"
                className="w-full px-4 py-3 rounded-xl border border-gray-300
                  focus:outline-none focus:ring-2 focus:ring-[#6BB7C7]/40
                focus:border-[#6BB7C7] transition"
              />

              {/* Original Price */}
              <input
                value={form.originalPrice}
                onChange={(e) =>
                  setForm({ ...form, originalPrice: e.target.value })
                }
                placeholder="Original price"
                type="number"
                className="w-full px-4 py-3 rounded-xl border border-gray-300
                  focus:outline-none focus:ring-2 focus:ring-[#6BB7C7]/40
                focus:border-[#6BB7C7] transition"
              />

              {/* Stock */}
              <input
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
                placeholder="Stock quantity"
                type="number"
                className="w-full px-4 py-3 rounded-xl border border-gray-300
                  focus:outline-none focus:ring-2 focus:ring-[#6BB7C7]/40
                focus:border-[#6BB7C7] transition"
              />
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-end">
              <button
                onClick={() => {
                  setIsAddProductModalOpen(false);
                  resetForm();
                  setIsEditing(false);
                }}
                className="px-6 py-3 rounded-full bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition"
              >
                Cancel
              </button>

              {isEditing ? (
                <button
                  onClick={updateProduct}
                  className="px-6 py-3 rounded-full bg-[#6BB7C7] text-white font-medium hover:bg-[#5aa5b5] transition"
                >
                  Update Product
                </button>
              ) : (
                <button
                  onClick={addProduct}
                  className="px-6 py-3 rounded-full bg-[#6BB7C7] text-white font-medium hover:bg-[#5aa5b5] transition"
                >
                  Add Product
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
