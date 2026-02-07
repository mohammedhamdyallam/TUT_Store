"use client";

// React
import { useState, useRef, useEffect } from "react";

// Next
import Link from "next/link";

// Comps
import LogoutBtn from "./logoutBtn";

// Icons
import { FiUser, FiChevronDown } from "react-icons/fi";

export default function AccountMenu({ userPayload }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="
          flex items-center gap-2
          px-4 py-2 rounded-full
          border border-[#6BB7C7]
          text-[#6BB7C7] text-sm font-medium
          hover:bg-[#6BB7C7] hover:text-white
          transition
        "
      >
        <FiUser size={16} />
        <span className="max-w-[90px] truncate">
          {userPayload.name}
        </span>
        <FiChevronDown
          size={14}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="
            absolute right-0 mt-3 w-48
            bg-white rounded-2xl shadow-lg
            border border-gray-100
            overflow-hidden z-50
          "
        >
          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className="
              block px-4 py-3 text-sm font-medium text-gray-700
              hover:bg-[#6BB7C7]/10 hover:text-[#3A7E8C]
              transition
            "
          >
            Profile
          </Link>

          <div className="border-t p-2">
            <LogoutBtn />
          </div>
        </div>
      )}
    </div>
  );
}
