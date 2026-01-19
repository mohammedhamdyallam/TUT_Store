import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      {/* Logo */}
      <Link href="/" className="flex flex-col items-center gap-3 mb-8">
        <Image src="/logo.png" alt="TUT Logo" width={100} height={100} />
        <h1 className="text-3xl font-serif font-bold tracking-wide text-[#0F3A5A]">
          TUT
        </h1>
      </Link>

      {/* Message */}
      <div className="text-center">
        <h2 className="text-5xl font-bold text-[#2A3A4B] mb-3">404</h2>
        <p className="text-lg text-[#55636F] mb-6">This page Not Found</p>

        <Link
          href="/"
          className="inline-block px-6 py-3 rounded-lg bg-[#2A7FAF] text-white font-medium hover:bg-[#1f6d92] transition"
        >
          Back To Home Page
        </Link>
      </div>
    </div>
  );
}
