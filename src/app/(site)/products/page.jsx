// Comps
import Product from "@/comps/mini-comps/product";
import ProductsPagination from "@/comps/mini-comps/productsPagination";
import SearchProductInput from "./searchProductInput";

// API calls
import { getProducts, getProductsCount } from "@/apiCalls/productsApiCalls";

// Utils
import { paginationItemPerPage } from "@/utils/constants";

export default async function Products({ searchParams }) {
  const { page } = await searchParams;
  const products = await getProducts(page);
  const productsCount = await getProductsCount();
  const pages = Math.ceil(productsCount / paginationItemPerPage);

  return (
    <main className="min-h-screen bg-linear-to-b from-white to-[#F5F9FA] px-4 md:px-8 lg:px-16 py-14">
      {/* Page Header */}
      <section className="text-center max-w-4xl mx-auto mb-20">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900">
          المنتجات
        </h1>

        <div className="w-28 h-1 bg-linear-to-r from-[#6BB7C7] to-[#4CA1AF] mx-auto mt-6 rounded-full"></div>
      </section>

      {/* Filters + Search */}
      <section className="mb-16">
        <div className="bg-white rounded-3xl shadow-md border border-gray-200 px-6 py-5 flex flex-col lg:flex-row gap-6 items-center justify-between">
          {/* Left Side: Search + Filter */}
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            {/* Search Bar */}
            <SearchProductInput />

            {/* Filter Button */}
            <div className="relative">
              <button
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
                تصفية
              </button>
            </div>
          </div>

          {/* Right Side: Products Count */}
          <div className="text-sm text-gray-600">
            عرض{" "}
            <span className="font-bold text-gray-900">
              {products.length}
            </span>{" "}
            منتج
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            id={product.id}
            title={product.title}
            category={product.category}
            price={product.price}
            discount={product.discount}
            originalPrice={product.originalPrice}
          />
        ))}
      </section>

      <ProductsPagination pages={pages} pageNumber={parseInt(page)} route="/products" />
    </main>
  );
}
