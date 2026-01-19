"use client";
// Next Js & React
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Redux
import { useSelector } from "react-redux";

// Framer Motion
import { motion, AnimatePresence } from "framer-motion";

// Icons
import { FiMenu, FiSearch, FiShoppingCart, FiUser, FiX } from "react-icons/fi";

export default function Header() {
  // Redux
  const cart = useSelector((state) => state.cart.cart);

  // State
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-50 w-full flex items-center justify-between px-6 md:px-10 py-4 bg-white shadow-sm border-b border-gray-200">
        {/* Logo */}
        <Link href={"/"} className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="TUT Logo"
            width={42}
            height={42}
            className="rounded-lg"
          />
          <h1 className="text-2xl font-serif font-bold tracking-wide text-[#0F3A5A]">
            TUT
          </h1>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:block">
          <ul className="flex gap-8 text-sm font-medium tracking-wide text-[#2A3A4B]">
            {["HOME", "PRODUCTS", "ABOUT", "CONTACT"].map((item, index) => (
              <li key={index}>
                <Link
                  href={item === "HOME" ? "/" : `/${item.toLowerCase()}`}
                  className="relative px-2 py-1 rounded-md hover:text-[#2A7FAF] transition"
                >
                  {item}
                  <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-[#2A7FAF] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Search */}
        <div className="hidden lg:flex items-center relative">
          <input
            type="text"
            placeholder="Search products..."
            className="w-64 pl-10 pr-4 py-2 text-sm rounded-full border border-gray-300
               focus:outline-none focus:ring-2 focus:ring-[#2A7FAF]/40
               focus:border-[#2A7FAF] transition"
          />
          <FiSearch size={16} className="absolute left-4 text-gray-400" />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-5">
          {/* Login */}
          <Link
            href="/login"
            className="flex items-center gap-2 text-sm font-medium text-[#2A3A4B] hover:text-[#2A7FAF] transition"
          >
            <FiUser size={18} />
            <span className="hidden sm:inline">Login</span>
          </Link>

          {/* Cart */}
          <Link
            href="/cart"
            className="relative hover:text-[#2A7FAF] transition"
          >
            <FiShoppingCart size={20} />
            <span className="absolute -top-2 -right-2 bg-[#2A7FAF] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
              {cart.length}
            </span>
          </Link>

          {/* Menu */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="block md:hidden text-[#2A3A4B] hover:text-[#2A7FAF] transition"
          >
            {isMenuOpen ? <FiX size={30} /> : <FiMenu size={30} />}
          </button>
        </div>
      </header>

      {/* Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: 0.35,
              ease: [0.4, 0, 0.2, 1], // smooth like jQuery
            }}
            className="fixed w-full overflow-hidden
                 bg-white shadow-md border-b border-[#6BB7C7]/30 z-50"
          >
            <ul className="flex flex-col p-6 space-y-5">
              {[
                { name: "HOME", path: "/" },
                { name: "PRODUCTS", path: "/products" },
                { name: "ABOUT", path: "/about" },
                { name: "CONTACT", path: "/contact" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-gray-800 text-lg font-medium
                         hover:text-[#6BB7C7] transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
