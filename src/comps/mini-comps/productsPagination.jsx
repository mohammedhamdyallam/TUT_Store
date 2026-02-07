// NextJs
import Link from "next/link";

// Icons
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function ProductsPagination({ pages, pageNumber, route }) {
  let pagesArray = [];
  for (let i = 1; i <= pages; i++) {
    pagesArray.push(i);
  }
  // if (totalPages <= 1) return null;

  // const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-1 mt-8">
      {/* Prev */}
      {pageNumber !== 1 && (
        <Link
          href={`?page=${pageNumber - 1}`}
          className="flex items-center gap-1 px-3 py-2 rounded-lg border text-sm
                     text-[#3A7E8C] border-[#B7DDE6]
                     hover:bg-[#EAF6F9] transition"
        >
          <FiChevronRight size={16} />
          <span className="hidden sm:inline">السابق</span>
        </Link>
      )}

      {/* Pages */}
      {pagesArray.map((page) => (
        <Link
          key={page}
          href={`?page=${page}`}
          className={`min-w-10 text-center px-3 py-2 rounded-lg border text-sm transition
            ${page === pageNumber
              ? "bg-[#6BB7C7] border-[#6BB7C7] text-white shadow"
              : "border-[#B7DDE6] text-[#3A7E8C] hover:bg-[#EAF6F9]"
            }
          `}
        >
          {page}
        </Link>
      ))}

      {/* Next */}
      {pageNumber !== pages && (
        <Link
          href={`?page=${pageNumber + 1}`}
          className="flex items-center gap-1 px-3 py-2 rounded-lg border text-sm
                     text-[#3A7E8C] border-[#B7DDE6]
                     hover:bg-[#EAF6F9] transition"
        >
          <span className="hidden sm:inline">التالي</span>
          <FiChevronLeft size={16} />
        </Link>
      )}
    </div>
  );
}
