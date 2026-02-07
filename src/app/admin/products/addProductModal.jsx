"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";

export default function AddProductModal({
  isAddProductModalOpen,
  setIsAddProductModalOpen,
}) {
  const [form, setForm] = useState({
    id: null,
    title: "",
    category: "",
    price: "", // final price (auto-calc)
    discount: "", // %
    originalPrice: "",
    stock: "",
    description: "",
    images: [],
    imagePreview: "",
  });

  // حساب السعر النهائي تلقائيًا حسب originalPrice و discount
  useEffect(() => {
    const original = Number(form.originalPrice);
    const discount = Number(form.discount);

    if (!isNaN(original) && !isNaN(discount)) {
      const newPrice = Math.max(0, original - (original * discount) / 100);
      setForm((prev) => ({ ...prev, price: newPrice }));
    }
  }, [form.originalPrice, form.discount]);

  // Handle Image Change Function
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files) return;

    setForm((prev) => ({
      ...prev,
      images: files,
      imagePreview: URL.createObjectURL(files[0]),
    }));
  };

  async function addProduct() {
    try {
      // Create Data
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("category", form.category);
      formData.append("price", Number(form.price));
      formData.append("discount", Number(form.discount));
      formData.append("originalPrice", Number(form.originalPrice));
      formData.append("stock", Number(form.stock));
      formData.append("description", form.description);
      // if (form.images) {
        form.images.forEach((img) => {
          formData.append("images", img);
        });
      // }

      console.log(formData);

      // Send a request to the API
      const res = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      setIsAddProductModalOpen(false);
      console.log("Created product:", data.product);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }

  return (
    <>
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
                إضافة منتج
              </h2>
              <button
                onClick={() => setIsAddProductModalOpen(false)}
                className="w-9 h-9 rounded-full flex items-center justify-center 
                  text-gray-500 hover:bg-gray-100 transition"
              >
                <FiX size={24} />
              </button>
            </div>

            {/* Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-1">
              {/* Image Upload */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  صورة المنتج
                </label>
                <div className="flex items-center gap-4">
                  <label
                    className="cursor-pointer px-6 py-3 rounded-full border border-dashed 
                              border-gray-300 text-sm text-gray-600 hover:bg-gray-50 transition"
                  >
                    رفع صورة
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>

                  {form.imagePreview && (
                    <div className="relative">
                      <Image
                        src={form.imagePreview}
                        alt="Preview"
                        className="w-24 h-24 rounded-xl object-cover border border-gray-200"
                        height={96}
                        width={96}
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

              {/* Title */}
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="اسم المنتج"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 
                          focus:outline-none focus:ring-2 focus:ring-[#6BB7C7]/40 
                          focus:border-[#6BB7C7] transition"
              />

              {/* Category */}
              <input
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                placeholder="القسم"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 
                          focus:outline-none focus:ring-2 focus:ring-[#6BB7C7]/40 
                          focus:border-[#6BB7C7] transition"
              />

              {/* Description */}
              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                placeholder="وصف المنتج"
                className="w-full md:col-span-2 px-4 py-3 rounded-xl border border-gray-300 
                          focus:outline-none focus:ring-2 focus:ring-[#6BB7C7]/40 
                          focus:border-[#6BB7C7] transition resize-none"
                rows={4}
              />

              {/* Original Price */}
              <input
                value={form.originalPrice}
                onChange={(e) =>
                  setForm({ ...form, originalPrice: e.target.value })
                }
                placeholder="السعر الأصلي"
                type="number"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 
                          focus:outline-none focus:ring-2 focus:ring-[#6BB7C7]/40 
                          focus:border-[#6BB7C7] transition"
              />

              {/* Discount */}
              <input
                value={form.discount}
                onChange={(e) => setForm({ ...form, discount: e.target.value })}
                placeholder="الخصم (%)"
                type="number"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 
                          focus:outline-none focus:ring-2 focus:ring-[#6BB7C7]/40 
                          focus:border-[#6BB7C7] transition"
              />

              {/* Price (Read-only) */}
              <input
                value={form.price}
                readOnly
                placeholder="السعر النهائي"
                type="number"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-100 
                          focus:outline-none transition"
              />

              {/* Stock */}
              <input
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
                placeholder="الكمية في المخزون"
                type="number"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 
                          focus:outline-none focus:ring-2 focus:ring-[#6BB7C7]/40 
                          focus:border-[#6BB7C7] transition"
              />
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-end">
              <button
                onClick={() => setIsAddProductModalOpen(false)}
                className="px-6 py-3 rounded-full bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition"
              >
                إلغاء
              </button>

              <button
                onClick={addProduct}
                className="px-6 py-3 rounded-full bg-[#6BB7C7] text-white font-medium hover:bg-[#5aa5b5] transition"
              >
                إضافة المنتج
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
