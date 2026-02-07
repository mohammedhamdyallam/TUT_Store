import Link from "next/link";
import { FiCheckCircle } from "react-icons/fi";

export default function OrderSuccess() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <FiCheckCircle className="mx-auto text-green-500" size={80} />

        <h1 className="mt-4 text-2xl font-bold text-gray-800">
          تم تأكيد طلبك بنجاح 🎉
        </h1>

        <p className="mt-2 text-gray-600 text-sm leading-relaxed">
          شكرًا لتسوقك معنا، تم استلام طلبك وسيتم التواصل معك قريبًا لتأكيد
          الشحن.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <Link
            href="/"
            className="w-full bg-[#2A7FAF] text-white py-3 rounded-xl
                       hover:bg-[#226a92] transition font-medium"
          >
            العودة للصفحة الرئيسية
          </Link>

          <Link
            href="/orders"
            className="w-full border border-[#2A7FAF] text-[#2A7FAF]
                       py-3 rounded-xl hover:bg-[#2A7FAF]/10 transition font-medium"
          >
            عرض طلباتي
          </Link>
        </div>
      </div>
    </div>
  );
}