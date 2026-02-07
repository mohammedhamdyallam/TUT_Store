"use client";
// NextJs
import Image from "next/image";

// React
import { useState } from "react";

// Icons
import { 
  FiSearch, 
  FiPlus, 
  FiEdit, 
  FiTrash2, 
  FiEye,
  FiFilter,
  FiGrid,
  FiList,
  FiPackage,
  FiTrendingUp,
  FiTag
} from "react-icons/fi";
import { FaBox, FaBoxOpen, FaChartBar } from "react-icons/fa";

// Comps
import AddProductModal from "./addProductModal";
import DeleteProductModal from "./deleteProductModal";
import EditProductModal from "./editProductModal";
import ProductsPagination from "@/comps/mini-comps/productsPagination";

export default function ProductsClient({ products, page, productsCount, pages }) {
  // State
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isDeleteProductModalOpen, setIsDeleteProductModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // Filter and sort products
  const filteredProducts = products
    .filter(product => 
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(product => 
      selectedCategory === "all" || product.category === selectedCategory
    )
    .sort((a, b) => {
      switch(sortBy) {
        case "price-high": return b.price - a.price;
        case "price-low": return a.price - b.price;
        case "stock-high": return b.stock - a.stock;
        case "stock-low": return a.stock - b.stock;
        default: return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

  // Get unique categories
  const categories = ["all", ...new Set(products.map(p => p.category))];

  // Statistics
  const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);
  const lowStock = products.filter(p => p.stock <= 10 && p.stock > 0).length;
  const outOfStock = products.filter(p => p.stock === 0).length;

  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-white to-[#F5F9FA] p-4 md:p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#6BB7C7" }}>
                  <FiPackage className="text-white text-xl" />
                </div>
                إدارة المنتجات
              </h1>
              <p className="text-gray-600">أضف، عدّل، أو احذف منتجات المتجر بسهولة</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-white rounded-xl shadow-sm border border-gray-100">
                <p className="text-sm text-gray-500">إجمالي المنتجات</p>
                <p className="text-lg font-bold" style={{ color: "#6BB7C7" }}>
                  {productsCount}
                </p>
              </div>
              <button
                onClick={() => setIsAddProductModalOpen(true)}
                className="px-5 py-2.5 rounded-xl text-white font-medium hover:shadow-lg transition-all flex items-center gap-2 shadow-md"
                style={{ 
                  backgroundColor: "#6BB7C7",
                  background: "linear-gradient(135deg, #6BB7C7 0%, #4A9AA9 100%)"
                }}
              >
                <FiPlus size={18} />
                منتج جديد
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">القيمة الإجمالية</p>
                  <p className="text-2xl font-bold" style={{ color: "#6BB7C7" }}>
                    {totalValue.toLocaleString()} ج.م
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#6BB7C7]/10">
                  <FaChartBar className="text-[#6BB7C7]" size={20} />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">متوفر بالمخزون</p>
                  <p className="text-2xl font-bold text-green-600">
                    {products.filter(p => p.stock > 10).length}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
                  <FaBox className="text-green-600" size={20} />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">منخفض المخزون</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {lowStock}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center">
                  <FiTrendingUp className="text-yellow-600" size={20} />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">منتهي المخزون</p>
                  <p className="text-2xl font-bold text-red-600">
                    {outOfStock}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
                  <FaBoxOpen className="text-red-600" size={20} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters & Controls */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <FiFilter className="text-[#6BB7C7]" />
                التصفية والترتيب
              </h3>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg ${viewMode === "grid" ? "bg-[#6BB7C7] text-white" : "bg-gray-100 text-gray-600"}`}
                >
                  <FiGrid size={18} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg ${viewMode === "list" ? "bg-[#6BB7C7] text-white" : "bg-gray-100 text-gray-600"}`}
                >
                  <FiList size={18} />
                </button>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:flex-none md:w-64">
                <input
                  type="text"
                  placeholder="بحث عن منتج..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 transition-all"
                  style={{ focusRingColor: "#6BB7C7" }}
                />
                <FiSearch className="absolute right-3 top-3 text-gray-400" size={18} />
              </div>
              
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 transition-all"
                style={{ focusRingColor: "#6BB7C7" }}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "all" ? "جميع الفئات" : cat}
                  </option>
                ))}
              </select>
              
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 transition-all"
                style={{ focusRingColor: "#6BB7C7" }}
              >
                <option value="newest">الأحدث أولاً</option>
                <option value="price-high">السعر من الأعلى</option>
                <option value="price-low">السعر من الأقل</option>
                <option value="stock-high">المخزون من الأعلى</option>
                <option value="stock-low">المخزون من الأقل</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Display */}
        <div className="mb-8">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group"
                >
                  {/* Product Image */}
                  <div className="relative h-48 overflow-hidden bg-gray-50">
                    <Image
                      src={product.images?.[0] || "/placeholder.jpg"}
                      alt={product.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium
                        ${product.stock === 0 ? "bg-red-100 text-red-700" :
                          product.stock <= 10 ? "bg-yellow-100 text-yellow-700" :
                          "bg-green-100 text-green-700"}`}>
                        {product.stock === 0 ? "منتهي" :
                         product.stock <= 10 ? "منخفض" : "متوفر"}
                      </span>
                    </div>
                    {product.discount > 0 && (
                      <div className="absolute top-3 right-3">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-500 text-white">
                          {product.discount}% خصم
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-5">
                    <div className="mb-3">
                      <h3 className="font-bold text-gray-900 text-lg line-clamp-1 mb-1">
                        {product.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <FiTag className="text-gray-400 text-sm" />
                        <span className="text-sm text-gray-600">{product.category}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-xl font-bold" style={{ color: "#6BB7C7" }}>
                          {product.price} ج.م
                        </div>
                        {product.discount > 0 && (
                          <div className="text-sm text-gray-500 line-through">
                            {(product.price / (1 - product.discount/100)).toFixed(0)} ج.م
                          </div>
                        )}
                      </div>
                      <div className="text-sm text-gray-600">
                        المخزون: <span className="font-medium">{product.stock}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedProduct(product);
                          setIsEditProductModalOpen(true);
                        }}
                        className="flex-1 px-4 py-2.5 rounded-xl border border-[#6BB7C7] text-[#6BB7C7] font-medium hover:bg-[#6BB7C7]/10 transition-colors flex items-center justify-center gap-2"
                      >
                        <FiEdit size={16} />
                        تعديل
                      </button>
                      <button
                        onClick={() => {
                          setSelectedProduct(product);
                          setIsDeleteProductModalOpen(true);
                        }}
                        className="px-4 py-2.5 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                      >
                        <FiTrash2 size={16} />
                      </button>
                      <button className="px-4 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                        <FiEye size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* List View */
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="text-right" style={{ backgroundColor: "#6BB7C7" }}>
                    <tr>
                      <th className="px-6 py-4 text-white font-semibold text-sm">المنتج</th>
                      <th className="px-6 py-4 text-white font-semibold text-sm">الفئة</th>
                      <th className="px-6 py-4 text-white font-semibold text-sm">السعر</th>
                      <th className="px-6 py-4 text-white font-semibold text-sm">المخزون</th>
                      <th className="px-6 py-4 text-white font-semibold text-sm">الحالة</th>
                      <th className="px-6 py-4 text-white font-semibold text-sm">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product, index) => (
                      <tr key={product.id} className={`
                        border-b border-gray-100 hover:bg-gray-50/50 transition-colors
                        ${index % 2 === 0 ? "bg-white" : "bg-gray-50/30"}
                      `}>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                              <Image
                                src={product.images?.[0] || "/placeholder.jpg"}
                                alt={product.title}
                                width={48}
                                height={48}
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{product.title}</div>
                              <div className="text-xs text-gray-500">ID: #{product.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm bg-gray-100 text-gray-700">
                            <FiTag size={12} />
                            {product.category}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-bold" style={{ color: "#6BB7C7" }}>{product.price} ج.م</div>
                            {product.discount > 0 && (
                              <div className="text-xs text-red-500">{product.discount}% خصم</div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium">{product.stock}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className={`px-3 py-1.5 rounded-full text-xs font-medium inline-flex items-center gap-2
                            ${product.stock === 0 ? "bg-red-100 text-red-700" :
                              product.stock <= 10 ? "bg-yellow-100 text-yellow-700" :
                              "bg-green-100 text-green-700"}`}>
                            <div className={`w-2 h-2 rounded-full
                              ${product.stock === 0 ? "bg-red-500" :
                                product.stock <= 10 ? "bg-yellow-500" :
                                "bg-green-500"}`}></div>
                            {product.stock === 0 ? "منتهي" :
                             product.stock <= 10 ? "منخفض" : "متوفر"}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                setSelectedProduct(product);
                                setIsEditProductModalOpen(true);
                              }}
                              className="p-2 rounded-lg text-gray-600 hover:text-[#6BB7C7] hover:bg-[#6BB7C7]/10 transition-colors"
                              title="تعديل"
                            >
                              <FiEdit size={18} />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedProduct(product);
                                setIsDeleteProductModalOpen(true);
                              }}
                              className="p-2 rounded-lg text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors"
                              title="حذف"
                            >
                              <FiTrash2 size={18} />
                            </button>
                            <button className="p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                              title="عرض">
                              <FiEye size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 bg-gray-100">
                <FiPackage className="text-gray-400 text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">لا توجد منتجات</h3>
              <p className="text-gray-600 mb-6">لم يتم العثور على منتجات مطابقة للبحث</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="px-6 py-3 rounded-xl text-white font-medium hover:shadow-lg transition-all"
                style={{ backgroundColor: "#6BB7C7" }}
              >
                عرض جميع المنتجات
              </button>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <ProductsPagination 
            pages={pages} 
            pageNumber={parseInt(page)} 
            route="/admin/products" 
          />
        </div>
      </main>

      {/* Modals */}
      <AddProductModal
        isAddProductModalOpen={isAddProductModalOpen}
        setIsAddProductModalOpen={setIsAddProductModalOpen}
      />

      <EditProductModal
        isEditProductModalOpen={isEditProductModalOpen}
        setIsEditProductModalOpen={setIsEditProductModalOpen}
        productTitle={selectedProduct.title}
        productId={selectedProduct.id}
      />

      <DeleteProductModal
        isDeleteProductModalOpen={isDeleteProductModalOpen}
        setIsDeleteProductModalOpen={setIsDeleteProductModalOpen}
        product={selectedProduct}
      />
    </>
  );
}