'use client';
import { useState } from "react";
import Image from "next/image";
import { FiX } from "react-icons/fi";

export default function EditProductModal({
  isEditProductModalOpen,
  setIsEditProductModalOpen,
  product,
}) {
  const [form, setForm] = useState({
    id: null,
    title: "",
    category: "",
    price: "",
    discount: "",
    originalPrice: "",
    stock: "",
    image: null,
    imagePreview: "",
  });

  function editProduct() {

  }

  return (
    <>
      {isEditProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setIsEditProductModalOpen(false)}
          />

          {/* Modal */}
          <div className="relative z-50 w-full max-w-2xl mx-4 bg-white rounded-3xl shadow-xl border border-gray-200 p-6 md:p-8 animate-fadeIn">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                تعديل المنتج
              </h2>

              <button
                onClick={() => {
                  setIsEditProductModalOpen(false);
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

              {/* Price */}
              <input
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="السعر"
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
                onClick={() => {
                  setIsEditProductModalOpen(false);
                }}
                className="px-6 py-3 rounded-full bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition"
              >
                إلغاء
              </button>

              <button
                onClick={editProduct}
                className="px-6 py-3 rounded-full bg-[#6BB7C7] text-white font-medium hover:bg-[#5aa5b5] transition"
              >
                تحديث المنتج
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
