"use client";
// NextJs
import Link from "next/link";
import { usePathname } from "next/navigation";

// React
import { useState } from "react";

// Icons
import { 
  FiMenu, 
  FiLogOut, 
  FiGrid, 
  FiPackage, 
  FiShoppingCart, 
  FiUsers,
  FiHome 
} from "react-icons/fi";

export default function AdminAsideBar() {
  // State
  const [open, setOpen] = useState(false);

  // PathName
  const pathname = usePathname();

  const linkClass = (path) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg ${
      pathname === path
        ? "bg-[#6BB7C7] text-white"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 right-4 z-50 md:hidden text-white p-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
        style={{ backgroundColor: "#6BB7C7" }}
      >
        <FiMenu size={25} />
      </button>

      {/* Overlay (mobile only) */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition-all duration-300"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed top-0 right-0 z-50 h-screen w-72 bg-gradient-to-b from-white to-gray-50/50 
        shadow-2xl transform transition-all duration-500 ease-out
        ${open ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
        md:translate-x-0 md:opacity-100
      `}
      >
        {/* Header */}
        <div
          className="h-20 flex items-center justify-between px-6 border-b"
          style={{
            borderColor: "#6BB7C7",
            background: "linear-gradient(90deg, #6BB7C7 0%, #9ED4E1 100%)",
          }}
        >
          <div>
            <h2 className="text-xl font-bold text-white">لوحة التحكم</h2>
            <p className="text-sm text-white/90">مرحباً بالمدير</p>
          </div>

          {/* Close (mobile) */}
          <button
            onClick={() => setOpen(false)}
            className="md:hidden text-white text-xl bg-white/20 p-2 rounded-lg hover:bg-white/30 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Profile Section */}
        <div className="px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
              style={{ backgroundColor: "#6BB7C7" }}
            >
              م
            </div>
            <div>
              <h3 className="font-bold text-gray-800">المدير</h3>
              <p className="text-sm text-gray-500">Admin@example.com</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          <Link
            href="/admin"
            className={`
            flex items-center gap-3 px-4 py-3 rounded-xl font-medium
            transition-all duration-300 hover:shadow-md
            ${
              pathname === "/admin"
                ? "text-white shadow-lg"
                : "text-gray-700 hover:text-gray-900"
            }
          `}
            style={pathname === "/admin" ? { backgroundColor: "#6BB7C7" } : {}}
            onClick={() => setOpen(false)}
          >
            <div
              className={`p-2 rounded-lg ${pathname === "/admin" ? "bg-white/20" : "bg-gray-100"}`}
            >
              <FiGrid size={18} />
            </div>
            لوحة القيادة
          </Link>

          <Link
            href="/admin/products?page=1"
            className={`
            flex items-center gap-3 px-4 py-3 rounded-xl font-medium
            transition-all duration-300 hover:shadow-md
            ${
              pathname.includes("/admin/products")
                ? "text-white shadow-lg"
                : "text-gray-700 hover:text-gray-900"
            }
          `}
            style={
              pathname.includes("/admin/products")
                ? { backgroundColor: "#6BB7C7" }
                : {}
            }
            onClick={() => setOpen(false)}
          >
            <div
              className={`p-2 rounded-lg ${pathname.includes("/admin/products") ? "bg-white/20" : "bg-gray-100"}`}
            >
              <FiPackage size={18} />
            </div>
            المنتجات
          </Link>

          <Link
            href="/admin/orders"
            className={`
            flex items-center gap-3 px-4 py-3 rounded-xl font-medium
            transition-all duration-300 hover:shadow-md
            ${
              pathname.includes("/admin/orders")
                ? "text-white shadow-lg"
                : "text-gray-700 hover:text-gray-900"
            }
          `}
            style={
              pathname.includes("/admin/orders")
                ? { backgroundColor: "#6BB7C7" }
                : {}
            }
            onClick={() => setOpen(false)}
          >
            <div
              className={`p-2 rounded-lg ${pathname.includes("/admin/orders") ? "bg-white/20" : "bg-gray-100"}`}
            >
              <FiShoppingCart size={18} />
            </div>
            الطلبات
          </Link>

          <Link
            href="/admin/users?page=1"
            className={`
            flex items-center gap-3 px-4 py-3 rounded-xl font-medium
            transition-all duration-300 hover:shadow-md
            ${
              pathname.includes("/admin/users")
                ? "text-white shadow-lg"
                : "text-gray-700 hover:text-gray-900"
            }
          `}
            style={
              pathname.includes("/admin/users")
                ? { backgroundColor: "#6BB7C7" }
                : {}
            }
            onClick={() => setOpen(false)}
          >
            <div
              className={`p-2 rounded-lg ${pathname.includes("/admin/users") ? "bg-white/20" : "bg-gray-100"}`}
            >
              <FiUsers size={18} />
            </div>
            المستخدمين
          </Link>

          {/* Divider */}
          <div className="my-4 border-t border-gray-100"></div>

          {/* Back to Home */}
          <Link
            href="/"
            className={`
            flex items-center gap-3 px-4 py-3 rounded-xl font-medium
            transition-all duration-300 hover:shadow-md
            ${
              pathname === "/"
                ? "text-white shadow-lg"
                : "text-gray-700 hover:text-gray-900"
            }
          `}
            style={pathname === "/" ? { backgroundColor: "#6BB7C7" } : {}}
            onClick={() => setOpen(false)}
          >
            <div
              className={`p-2 rounded-lg ${pathname === "/" ? "bg-white/20" : "bg-gray-100"}`}
            >
              <FiHome size={18} />
            </div>
            العودة للصفحة الرئيسية
          </Link>

          {/* Logout */}
          <button
            onClick={() => {
              // Add logout logic here
              router.push("/");
              setOpen(false);
            }}
            className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-red-600 hover:bg-red-50 hover:text-red-700 w-full transition-all duration-300 hover:shadow-md"
          >
            <div className="p-2 rounded-lg bg-red-100">
              <FiLogOut size={18} className="text-red-600" />
            </div>
            تسجيل الخروج
          </button>
        </nav>

        {/* Footer Section */}
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-100">
          <div className="text-center">
            <div
              className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-2"
              style={{ backgroundColor: "#6BB7C7", color: "white" }}
            >
              الإصدار 1.0.0
            </div>
            <p className="text-xs text-gray-500">© 2024 جميع الحقوق محفوظة</p>
          </div>
        </div>
      </aside>
    </>
  );
}
