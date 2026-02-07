"use client";
// NextJs
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

// React
import { useState } from "react";

// Framer Motion
import { motion, AnimatePresence } from "framer-motion";

// Icons
import { FiMenu, FiSearch, FiShoppingCart, FiUser, FiX } from "react-icons/fi";

// Comps
import AccountMenu from "../mini-comps/accountMenu";

// Context
import { useCart } from "@/contexts/cartContext";

// Utils
import { allowedRoles } from "@/utils/constants";

export default function HeaderClient({ userPayload }) {
  // Redux
  const { cart } = useCart();

  // State
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // PathName
  const pathname = usePathname();

  // Active Link Function
  const linkClass = (path) =>
    `relative px-2 py-1 rounded-md transition group
   ${pathname === path || pathname.startsWith(path + "/")
      ? "text-[#2A7FAF]"
      : "text-gray-700 hover:text-[#2A7FAF]"
    }`;

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
            توت
          </h1>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:block">
          <ul className="flex gap-8 text-sm font-medium tracking-wide text-[#2A3A4B]">
            {[
              { name: "الرئيسية", path: "/", id: "HOME" },
              { name: "المنتجات", path: "/products?page=1", id: "PRODUCTS", basePath: "/products" },
              { name: "من نحن", path: "/about", id: "ABOUT" },
              { name: "تواصل معنا", path: "/contact", id: "CONTACT" },
            ].map((item) => (
              <li key={item.id}>
                <Link
                  href={item.path}
                  className={linkClass(item.basePath || item.path)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            {userPayload !== null &&
              allowedRoles.includes(userPayload.role) && (
                <li>
                  <Link href={"admin"} className={linkClass("/admin")}>
                    الادمن
                  </Link>
                </li>
              )}
          </ul>
        </nav>

        {/* Search */}
        <div className="hidden lg:flex items-center relative">
          <input
            type="text"
            placeholder="ابحث عن المنتجات..."
            className="w-64 pr-10 pl-4 py-2 text-sm rounded-full border border-gray-300
               focus:outline-none focus:ring-2 focus:ring-[#2A7FAF]/40
               focus:border-[#2A7FAF] transition"
          />
          <FiSearch size={16} className="absolute right-4 text-gray-400" />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-5">
          {/* Login */}
          {userPayload ? (
            <AccountMenu userPayload={userPayload} />
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 text-sm font-medium text-[#2A3A4B] hover:text-[#2A7FAF] transition"
            >
              <FiUser size={18} />
              <span className="hidden sm:inline">تسجيل الدخول</span>
            </Link>
          )}

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
                { name: "الرئيسية", path: "/" },
                { name: "المنتجات", path: "/products" },
                { name: "من نحن", path: "/about" },
                { name: "تواصل معنا", path: "/contact" },
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
              {userPayload !== null &&
                allowedRoles.includes(userPayload.role) && (
                  <li>
                    <Link
                      href={"admin"}
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-gray-800 text-lg font-medium
                         hover:text-[#6BB7C7] transition-colors"
                    >
                      الادمن
                    </Link>
                  </li>
                )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
