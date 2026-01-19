// NextJs
import Image from "next/image";
import Link from "next/link";

// Icons
import {
  FiInstagram,
  FiFacebook,
  FiMail,
  FiPhone,
  FiMapPin,
  FiChevronDown,
} from "react-icons/fi";
import { TbBrandTiktok } from "react-icons/tb";

// Meta Data
export const metadata = {
  title: "TUT | About",
  description: "TUT Store",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section - Fixed */}
      <div className="relative min-h-[85vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#6BB7C7] via-[#7abed0] to-[#8AC9D5]">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full border-2 border-white"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full border-2 border-white"></div>
          <div className="absolute top-1/3 right-1/3 w-64 h-64 rounded-full border-2 border-white"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-8 h-8 rounded-full bg-white/20"></div>
        <div className="absolute bottom-32 right-32 w-12 h-12 rounded-full bg-white/15"></div>
        <div className="absolute top-40 right-40 w-6 h-6 rounded-full bg-white/25"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center px-4">
              {/* Logo Container */}
              <div className="flex justify-center mb-10 md:mb-12">
                <div className="relative w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 bg-white/20 backdrop-blur-md rounded-full p-6 shadow-2xl transform transition-all duration-500 hover:scale-105 hover:rotate-3 border-8 border-white/30">
                  <div className="absolute inset-0 rounded-full border-4 border-white/50 animate-pulse"></div>
                  <Image
                    src="/logo.png"
                    alt="TUT Logo"
                    width={180}
                    height={180}
                    className="object-contain w-full h-full"
                    priority
                  />
                </div>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
                About <span className="text-white/95 drop-shadow-lg">TUT</span>
              </h1>

              {/* Subtitle */}
              <div className="max-w-4xl mx-auto mb-10 md:mb-12">
                <p className="text-xl md:text-2xl lg:text-3xl text-white/95 leading-relaxed font-light">
                  TUT is a modern online store specialized in selling
                  high-quality
                  <span className="font-semibold text-white ml-2">
                    Women's Shoes & Bags
                  </span>
                  , combining elegance, comfort, and contemporary fashion
                  trends.
                </p>
              </div>

              {/* Stats or Features */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12">
                <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                  <div className="text-2xl md:text-3xl font-bold text-white">
                    500+
                  </div>
                  <div className="text-white/80 text-sm md:text-base">
                    Products
                  </div>
                </div>
                <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                  <div className="text-2xl md:text-3xl font-bold text-white">
                    50+
                  </div>
                  <div className="text-white/80 text-sm md:text-base">
                    Brands
                  </div>
                </div>
                <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                  <div className="text-2xl md:text-3xl font-bold text-white">
                    1000+
                  </div>
                  <div className="text-white/80 text-sm md:text-base">
                    Happy Customers
                  </div>
                </div>
                <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                  <div className="text-2xl md:text-3xl font-bold text-white">
                    24/7
                  </div>
                  <div className="text-white/80 text-sm md:text-base">
                    Support
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 180"
            className="w-full h-auto"
            preserveAspectRatio="none"
          >
            <path
              fill="#f9fafb"
              fillOpacity="1"
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>

      {/* Rest of the content remains the same as previous code... */}
      <div className="container mx-auto px-6 py-16 md:py-20">
        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
          {/* Who We Are */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-[#6BB7C7]/10 flex items-center justify-center mr-4">
                <span className="text-2xl text-[#6BB7C7]">👠</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Who We Are</h2>
            </div>

            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                At TUT, we believe that every woman deserves stylish footwear
                and bags that match her personality and lifestyle. Our products
                are carefully selected to offer a perfect balance between
                quality, design, and affordability.
              </p>

              <p className="text-gray-700 leading-relaxed">
                We aim to provide a smooth and secure shopping experience with
                fast support and trusted service to ensure our customers'
                satisfaction.
              </p>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Our Core Values
                </h3>
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 bg-[#6BB7C7]/10 text-[#6BB7C7] rounded-full text-sm font-medium">
                    Quality
                  </span>
                  <span className="px-4 py-2 bg-[#6BB7C7]/10 text-[#6BB7C7] rounded-full text-sm font-medium">
                    Elegance
                  </span>
                  <span className="px-4 py-2 bg-[#6BB7C7]/10 text-[#6BB7C7] rounded-full text-sm font-medium">
                    Comfort
                  </span>
                  <span className="px-4 py-2 bg-[#6BB7C7]/10 text-[#6BB7C7] rounded-full text-sm font-medium">
                    Trust
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Our Vision */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-[#6BB7C7]/10 flex items-center justify-center mr-4">
                <span className="text-2xl text-[#6BB7C7]">🎯</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Our Vision & Mission
              </h2>
            </div>

            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                We strive to be the premier destination for women seeking
                high-quality shoes and bags that combine elegance with
                practicality, while staying committed to the latest global
                fashion trends.
              </p>

              <div className="mt-8 space-y-6">
                <div className="flex items-start">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-[#6BB7C7] flex items-center justify-center mt-1 mr-3">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <p className="text-gray-700">
                    Carefully curated products from the best sources
                  </p>
                </div>

                <div className="flex items-start">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-[#6BB7C7] flex items-center justify-center mt-1 mr-3">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <p className="text-gray-700">
                    Fast and reliable shipping worldwide
                  </p>
                </div>

                <div className="flex items-start">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-[#6BB7C7] flex items-center justify-center mt-1 mr-3">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <p className="text-gray-700">
                    Exceptional customer service and support
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact & Social */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Information */}
          <div className="bg-linear-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Contact Information
            </h2>

            <div className="space-y-6">
              <div className="flex items-start p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="w-12 h-12 rounded-full bg-[#6BB7C7]/10 flex items-center justify-center mr-4">
                  <FiMail className="text-[#6BB7C7] text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <p className="text-gray-600 mt-1">support@tut.com</p>
                  <p className="text-sm text-gray-500 mt-2">
                    We respond within 24 hours
                  </p>
                </div>
              </div>

              <div className="flex items-start p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="w-12 h-12 rounded-full bg-[#6BB7C7]/10 flex items-center justify-center mr-4">
                  <FiPhone className="text-[#6BB7C7] text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Phone</h3>
                  <p className="text-gray-600 mt-1">+20 111 000 0000</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Monday to Friday, 9 AM - 6 PM
                  </p>
                </div>
              </div>

              <div className="flex items-start p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="w-12 h-12 rounded-full bg-[#6BB7C7]/10 flex items-center justify-center mr-4">
                  <FiMapPin className="text-[#6BB7C7] text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Location</h3>
                  <p className="text-gray-600 mt-1">Cairo, Egypt</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Serving customers worldwide
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media & Follow Us */}
          <div className="bg-linear-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Follow Us & Stay Updated
            </h2>

            <p className="text-gray-700 mb-8">
              Stay connected with TUT for the latest collections, fashion tips,
              and exclusive offers. Follow us on social media!
            </p>

            {/* Social Media Icons */}
            <div className="flex flex-wrap gap-4 mb-8">
              <Link
                href="https://instagram.com/tut"
                target="_blank"
                className="group flex-1 min-w-[140px] p-4 rounded-xl border border-gray-200 text-center hover:border-[#6BB7C7] hover:bg-[#6BB7C7]/5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                  <FiInstagram className="text-white text-xl" />
                </div>
                <span className="font-medium text-gray-900">Instagram</span>
                <p className="text-sm text-gray-500 mt-1">@tut</p>
              </Link>

              <Link
                href="https://facebook.com/tut"
                target="_blank"
                className="group flex-1 min-w-[140px] p-4 rounded-xl border border-gray-200 text-center hover:border-[#6BB7C7] hover:bg-[#6BB7C7]/5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-[#1877F2] flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                  <FiFacebook className="text-white text-xl" />
                </div>
                <span className="font-medium text-gray-900">Facebook</span>
                <p className="text-sm text-gray-500 mt-1">TUT Store</p>
              </Link>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="https://tiktok.com/@tut"
                target="_blank"
                className="group flex-1 min-w-[140px] p-4 rounded-xl border border-gray-200 text-center hover:border-[#6BB7C7] hover:bg-[#6BB7C7]/5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                  <TbBrandTiktok className="text-white text-xl" />
                </div>
                <span className="font-medium text-gray-900">TikTok</span>
                <p className="text-sm text-gray-500 mt-1">@tut</p>
              </Link>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <div className="bg-linear-to-r from-[#6BB7C7] to-[#8AC9D5] rounded-2xl p-8 md:p-12 shadow-xl">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Elevate Your Style?
            </h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Explore our exclusive collection of women's shoes and bags
              designed for the modern, elegant woman.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="px-8 py-3 bg-white text-[#6BB7C7] font-semibold rounded-full hover:bg-gray-100 transition duration-300 shadow-lg hover:shadow-xl"
              >
                Shop Now
              </Link>
              <Link
                href="/contact"
                className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
