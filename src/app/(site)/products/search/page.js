// Comps
import Product from "@/comps/mini-comps/product";

// Data Service
import { getSearchProductsDB } from "@/lib/data-service";

// Icons
import { FiSearch } from "react-icons/fi";

export default async function SearchProductsPage({ searchParams }) {
  const { searchKey } = await searchParams;
  const products = await getSearchProductsDB(searchKey);

  return (
    <div>
      {products.length !== 0 ? (
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
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          {/* Icon */}
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-[#EAF6F9] mb-6">
            <FiSearch className="w-10 h-10 text-[#6BB7C7]" />
          </div>

          {/* Text */}
          <h3 className="text-2xl font-semibold text-[#3A7E8C] mb-2">
            No products found
          </h3>

          <p className="max-w-md text-[#3A7E8C]/70">
            We couldn’t find any products matching your search. Try using
            different keywords or browse all products.
          </p>
        </div>
      )}
    </div>
  );
}
