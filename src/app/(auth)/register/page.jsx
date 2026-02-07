"use client";
// NextJs
import Link from "next/link";
import { useRouter } from "next/navigation";

// React
import { useState } from "react";

// Axios
import axios from "axios";
import LoadingActions from "@/comps/app-comps/loadingActions";

export default function Register() {
  // State
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [isLoading, setIsLoading] = useState(false);

  // Router
  const router = useRouter();

  async function subminRegisterForm(e) {
    e.preventDefault();

    try {
      if (password === confirmPassword) {
        setIsLoading(true);
        await axios.post("http://localhost:3000/api/users/register", {
          name,
          email,
          password,
        });
        router.push("/");
        setIsLoading(false);
        router.refresh();
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  }

  return (
    <>
      {!isLoading ? (
        <main className="min-h-screen bg-linear-to-b from-white to-[#F5F9FA] flex items-center justify-center px-4">
          <div className="w-full max-w-md">
            {/* Card */}
            <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8">
              {/* Header */}
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 bg-[#6BB7C7]/10 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-[#6BB7C7]" />
                  <span className="text-sm font-medium text-[#6BB7C7]">
                    إنشاء حساب
                  </span>
                </div>

                <h1 className="text-3xl font-serif font-bold text-gray-900">
                  انضم إلينا اليوم
                </h1>

                <p className="mt-3 text-gray-600 text-sm">
                  أنشئ حسابك وابدأ التسوق
                </p>
              </div>

              {/* Form */}
              <form onSubmit={subminRegisterForm} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الاسم الكامل
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    placeholder="اسمك الكامل"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm
                           focus:outline-none focus:ring-2 focus:ring-[#6BB7C7]/40
                           focus:border-[#6BB7C7] transition"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
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
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm
                           focus:outline-none focus:ring-2 focus:ring-[#6BB7C7]/40
                           focus:border-[#6BB7C7] transition"
                  />
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    تأكيد كلمة المرور
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm
                           focus:outline-none focus:ring-2 focus:ring-[#6BB7C7]/40
                           focus:border-[#6BB7C7] transition"
                  />
                </div>

                {/* Terms */}
                <label className="flex items-start gap-2 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    className="mt-1 rounded border-gray-300 text-[#6BB7C7]
                           focus:ring-[#6BB7C7]/40"
                  />
                  <span>
                    أوافق على{" "}
                    <Link
                      href="/terms"
                      className="text-[#6BB7C7] hover:underline"
                    >
                      الشروط والأحكام
                    </Link>
                  </span>
                </label>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-[#6BB7C7] text-white font-medium
                         hover:bg-[#5aa5b5] transition shadow-md"
                >
                  إنشاء الحساب
                </button>
              </form>

              {/* Divider */}
              <div className="my-8 flex items-center gap-4">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-xs text-gray-400">أو</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              {/* Login */}
              <p className="text-center text-sm text-gray-600">
                لديك حساب بالفعل؟{" "}
                <Link
                  href="/login"
                  className="text-[#6BB7C7] font-medium hover:underline"
                >
                  سجل الدخول
                </Link>
              </p>
            </div>
          </div>
        </main>
      ) : (
        <LoadingActions />
      )}
    </>
  );
}
