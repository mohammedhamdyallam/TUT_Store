import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-4xl font-bold text-gray-900">Contact Us</h1>
          <p className="mt-4 max-w-2xl mx-auto text-gray-600 text-lg">
            Have a question or need help? We’re always here to support you.
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Get in Touch
            </h2>

            <ul className="space-y-6 text-gray-600">
              <li className="flex items-center gap-4">
                <FiMail className="text-xl text-gray-900" />
                <span>support@tut.com</span>
              </li>

              <li className="flex items-center gap-4">
                <FiPhone className="text-xl text-gray-900" />
                <span>+20 111 000 0000</span>
              </li>

              <li className="flex items-center gap-4">
                <FiMapPin className="text-xl text-gray-900" />
                <span>Egypt</span>
              </li>
            </ul>

            <p className="mt-8 text-gray-500 leading-relaxed">
              Our support team is available to answer your questions and help
              you with your orders as quickly as possible.
            </p>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Send Us a Message
            </h2>

            <form className="space-y-5">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900"
              />

              <textarea
                rows={5}
                placeholder="Your Message"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900"
              />

              <button
                type="submit"
                className="w-full rounded-xl bg-gray-900 text-white py-3 font-medium
                    hover:bg-gray-800 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
