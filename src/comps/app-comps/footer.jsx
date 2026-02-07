// NextJs
import Link from "next/link";

// Icons
import { FiInstagram, FiFacebook } from "react-icons/fi";
import { TbBrandTiktok } from "react-icons/tb";

export default function Footer() {
  const socialMedia = [
    {
      icon: <FiInstagram className="w-5 h-5" />,
      name: "Instagram",
      url: "https://instagram.com/tut",
      color:
        "hover:bg-gradient-to-br from-purple-500 via-pink-500 to-yellow-500",
    },
    {
      icon: <FiFacebook className="w-5 h-5" />,
      name: "Facebook",
      url: "https://facebook.com/tut",
      color: "hover:bg-blue-600",
    },
    {
      icon: <TbBrandTiktok className="w-5 h-5" />,
      name: "TikTok",
      url: "https://tiktok.com/@tut",
      color: "hover:bg-gray-800",
    },
  ];

  return (
    <footer className="bg-sky-50 text-slate-600 border-t border-sky-100">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-sky-700">توت</h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-500">
            منصة تجارة إلكترونية حديثة تقدم منتجات عالية الجودة مع تجربة تسوق
            سلسة.
          </p>

          {/* Social Media */}
          <div className="flex items-center gap-3 mt-6">
            {socialMedia.map((item) => (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.name}
                className={`p-2 rounded-full bg-white border border-sky-100 text-sky-600 
              transition-all duration-300 hover:scale-105 hover:text-white ${item.color}`}
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Pages */}
        <div>
          <h3 className="text-sky-700 font-semibold mb-4">الصفحات</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-sky-600">
                الرئيسية
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-sky-600">
                المنتجات
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-sky-600">
                من نحن
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-sky-600">
                تواصل معنا
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-sky-700 font-semibold mb-4">الدعم</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/privacy" className="hover:text-sky-600">
                سياسة الخصوصية
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-sky-600">
                الشروط والأحكام
              </Link>
            </li>
            <li>
              <Link href="/help" className="hover:text-sky-600">
                مركز المساعدة
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-sky-700 font-semibold mb-4">تواصل معنا</h3>
          <ul className="space-y-2 text-sm text-slate-500">
            <li>support@tut.com</li>
            <li>+20 111 000 0000</li>
            <li>مصر</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-sky-100 text-center py-4 text-xs text-slate-400">
        © {new Date().getFullYear()} توت. جميع الحقوق محفوظة.
      </div>
    </footer>
  );
}
