import Image from "next/image";
import Link from "next/link";
import { FiUser, FiMail, FiLock } from "react-icons/fi";

export default function Register() {
  return (
    <main className="min-h-screen bg-linear-to-b from-white to-[#F5F9FA] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 bg-[#6BB7C7]/10 rounded-full">
              <span className="w-2 h-2 rounded-full bg-[#6BB7C7]" />
              <span className="text-sm font-medium text-[#6BB7C7]">
                Create Account
              </span>
            </div>

            <h1 className="text-3xl font-serif font-bold text-gray-900">
              Join us today
            </h1>

            <p className="mt-3 text-gray-600 text-sm">
              Create your account and start shopping
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full name
              </label>
              <input
                type="text"
                placeholder="Your full name"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm
                           focus:outline-none focus:ring-2 focus:ring-[#6BB7C7]/40
                           focus:border-[#6BB7C7] transition"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm
                           focus:outline-none focus:ring-2 focus:ring-[#6BB7C7]/40
                           focus:border-[#6BB7C7] transition"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm
                           focus:outline-none focus:ring-2 focus:ring-[#6BB7C7]/40
                           focus:border-[#6BB7C7] transition"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm password
              </label>
              <input
                type="password"
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
                I agree to the{" "}
                <Link href="/terms" className="text-[#6BB7C7] hover:underline">
                  Terms & Conditions
                </Link>
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 rounded-full bg-[#6BB7C7] text-white font-medium
                         hover:bg-[#5aa5b5] transition shadow-md"
            >
              Create Account
            </button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">OR</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Login */}
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#6BB7C7] font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
