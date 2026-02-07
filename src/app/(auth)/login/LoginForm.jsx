"use client";
// NextJs
import Link from "next/link";
import { useRouter } from "next/navigation";

// React
import { useState } from "react";

// Axios
import axios from "axios";

// Comps
import LoadingActions from "@/comps/app-comps/loadingActions";

export default function LoginForm() {
  // State
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // Router
  const router = useRouter();

  async function submitLoginForm(e) {
    e.preventDefault();

    try {
      setIsLoading(true);
      await axios.post(
        "http://localhost:3000/api/users/login",
        { ...formData },
        {
          withCredentials: true,
        },
      );
      router.push("/");
      setIsLoading(false);
      router.refresh();
    } catch (err) {
      setIsLoading(false);
      console.log(err.response?.data || err.message);
    }
  }

  return (
    <>
      {!isLoading ? (
        <>
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 bg-[#6BB7C7]/10 rounded-full">
              <span className="w-2 h-2 rounded-full bg-[#6BB7C7]" />
              <span className="text-sm font-medium text-[#6BB7C7]">
                مرحباً بعودتك
              </span>
            </div>

            <h1 className="text-3xl font-serif font-bold text-gray-900">
              تسجيل الدخول إلى حسابك
            </h1>

            <p className="mt-3 text-gray-600 text-sm">
              أدخل بياناتك للمتابعة
            </p>
          </div>

          {/* Form */}
          <form onSubmit={submitLoginForm} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                البريد الإلكتروني
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                }}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm
            focus:outline-none focus:ring-2 focus:ring-[#6BB7C7]/40
            focus:border-[#6BB7C7] transition"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                كلمة المرور
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                }}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm
                           focus:outline-none focus:ring-2 focus:ring-[#6BB7C7]/40
                           focus:border-[#6BB7C7] transition"
              />
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-[#6BB7C7]
                             focus:ring-[#6BB7C7]/40"
                />
                تذكرني
              </label>

              <Link
                href="/forgot-password"
                className="text-[#6BB7C7] hover:underline"
              >
                نسيت كلمة المرور؟
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 rounded-full bg-[#6BB7C7] text-white font-medium
                         hover:bg-[#5aa5b5] transition shadow-md"
            >
              تسجيل الدخول
            </button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">أو</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Register */}
          <p className="text-center text-sm text-gray-600">
            ليس لديك حساب؟{" "}
            <Link
              href="/register"
              className="text-[#6BB7C7] font-medium hover:underline"
            >
              أنشئ حساباً
            </Link>
          </p>
        </>
      ) : (
        <LoadingActions />
      )}
    </>
  );
}
