"use client";
// NextJs
import { useRouter } from "next/navigation";

// React
import { useState } from "react";

export default function SearchProductInput() {
  const router = useRouter();
  // State
  const [searchKey, setSearchKey] = useState();

  // Router

  function searchSubmitHandler(e) {
    e.preventDefault();

    router.push(`/products/search?searchKey=${searchKey}`)
  }

  return (
    <form onSubmit={searchSubmitHandler} className="relative w-full sm:w-80">
      <input
        type="text"
        value={searchKey}
        onChange={(e) => {
          setSearchKey(e.target.value);
        }}
        placeholder="ابحث عن منتج..."
        className="w-full pl-12 pr-4 py-3 text-sm rounded-full border border-gray-300
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
    </form>
  );
}
