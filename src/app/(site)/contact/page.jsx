// NextJs
import Link from "next/link";

// Icons
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-4xl font-bold text-[#3A7E8C]">تواصل معنا</h1>
          <div className="mt-3 w-24 h-1 mx-auto rounded-full bg-[#6BB7C7]" />
          <p className="mt-6 max-w-2xl mx-auto text-[#3A7E8C]/80 text-lg">
            هل لديك سؤال أو تحتاج إلى مساعدة؟ نحن هنا دائماً لدعمك.
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="bg-white rounded-3xl p-8 shadow-md border border-[#B7DDE6]">
            <h2 className="text-2xl font-semibold text-[#3A7E8C] mb-6">
              معلومات التواصل
            </h2>

            <ul className="space-y-6 text-[#3A7E8C]">
              <li className="flex items-center gap-4">
                <FiMail className="text-xl text-[#6BB7C7]" />
                <span>support@tut.com</span>
              </li>

              <li className="flex items-center gap-4">
                <FiPhone className="text-xl text-[#6BB7C7]" />
                <span>+20 111 000 0000</span>
              </li>

              <li className="flex items-center gap-4">
                <FiMapPin className="text-xl text-[#6BB7C7]" />
                <span>مصر</span>
              </li>
            </ul>

            <p className="mt-8 text-[#3A7E8C]/70 leading-relaxed">
              فريق الدعم لدينا متاح للإجابة على أسئلتك ومساعدتك في طلباتك
              بأسرع وقت ممكن.
            </p>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-3xl p-8 shadow-md border border-[#B7DDE6]">
            <h2 className="text-2xl font-semibold text-[#3A7E8C] mb-6">
              أرسل لنا رسالة
            </h2>

            <form className="space-y-5">
              <input
                type="text"
                placeholder="الاسم"
                className="w-full rounded-xl border border-[#B7DDE6] px-4 py-3
                       focus:outline-none focus:ring-2 focus:ring-[#6BB7C7]"
              />

              <input
                type="email"
                placeholder="البريد الإلكتروني"
                className="w-full rounded-xl border border-[#B7DDE6] px-4 py-3
                       focus:outline-none focus:ring-2 focus:ring-[#6BB7C7]"
              />

              <textarea
                rows={5}
                placeholder="رسالتك"
                className="w-full rounded-xl border border-[#B7DDE6] px-4 py-3
                       focus:outline-none focus:ring-2 focus:ring-[#6BB7C7]"
              />

              <button
                type="submit"
                className="w-full rounded-xl bg-[#6BB7C7] text-white py-3 font-medium
                       hover:bg-[#5AA9B8] shadow-md transition"
              >
                إرسال الرسالة
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
