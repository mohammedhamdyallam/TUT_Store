"use client";

import { useCart } from "@/contexts/cartContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [userInfo, setUserInfo] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const [paymentMethod] = useState("COD");

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const handleConfirmOrder = async () => {
    setIsLoading(true);

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cartItems: cart,
        totalPrice,
        paymentMethod,
        userInfo,
      }),
    });

    if (res.ok) {
      clearCart();
      router.push("/order-success");
    }

    setIsLoading(false);
  };

  // اللون الرئيسي للموقع
  const primaryColor = "#6BB7C7";
  const primaryLight = "#9ED4E1";
  const primaryDark = "#4A9AA9";

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            إتمام عملية الشراء
          </h1>
          <p className="text-gray-600">أكمل الخطوات البسيطة لتأكيد طلبك</p>
        </div>

        {/* STEP INDICATOR - تصميم محسن */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-4">
            {[1, 2, 3].map((stepNum) => (
              <div
                key={stepNum}
                className="flex flex-col items-center relative"
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg transition-all duration-300 ${
                    step >= stepNum
                      ? "scale-110 shadow-xl"
                      : "bg-gray-300 scale-100"
                  }`}
                  style={{
                    backgroundColor: step >= stepNum ? primaryColor : "",
                  }}
                >
                  {stepNum}
                </div>
                <span
                  className={`mt-2 text-sm font-medium ${
                    step >= stepNum ? "text-gray-800" : "text-gray-500"
                  }`}
                >
                  {stepNum === 1
                    ? "البيانات"
                    : stepNum === 2
                    ? "طريقة الدفع"
                    : "تأكيد الطلب"}
                </span>
              </div>
            ))}
            
            {/* خط المؤشر */}
            <div className="absolute left-0 right-0 top-6 mx-4 z-0">
              <div className="flex justify-between px-12">
                <div
                  className="h-1 w-5/12 transition-all duration-500"
                  style={{
                    backgroundColor: step >= 2 ? primaryLight : "#E5E7EB",
                  }}
                ></div>
                <div
                  className="h-1 w-5/12 transition-all duration-500"
                  style={{
                    backgroundColor: step >= 3 ? primaryLight : "#E5E7EB",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* STEP 1 – PERSONAL INFO */}
        {step === 1 && (
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 transition-all duration-300">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                معلومات التوصيل
              </h2>
              <p className="text-gray-600">
                يرجى إدخال بياناتك الشخصية لتتمكن من استلام الطلب
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  الاسم بالكامل
                </label>
                <input
                  type="text"
                  placeholder="أدخل اسمك الكامل"
                  className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 transition-all duration-200"
                  style={{ focusRingColor: primaryColor }}
                  value={userInfo.name}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, name: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  رقم الهاتف
                </label>
                <input
                  type="text"
                  placeholder="أدخل رقم هاتفك"
                  className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 transition-all duration-200"
                  style={{ focusRingColor: primaryColor }}
                  value={userInfo.phone}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, phone: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  العنوان التفصيلي
                </label>
                <textarea
                  placeholder="أدخل عنوانك بالتفصيل (الحي، الشارع، رقم المبني، إلخ)"
                  className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 transition-all duration-200"
                  style={{ focusRingColor: primaryColor }}
                  rows="4"
                  value={userInfo.address}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, address: e.target.value })
                  }
                />
              </div>

              <button
                disabled={
                  !userInfo.name || !userInfo.phone || !userInfo.address
                }
                onClick={() => setStep(2)}
                className="w-full text-white py-4 rounded-xl font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:shadow-lg mt-4"
                style={{
                  backgroundColor: primaryColor,
                  hoverBackgroundColor: primaryDark,
                }}
              >
                متابعة إلى طريقة الدفع
              </button>
            </div>
          </div>
        )}

        {/* STEP 2 – PAYMENT */}
        {step === 2 && (
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 transition-all duration-300">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                طريقة الدفع
              </h2>
              <p className="text-gray-600">
                اختر الطريقة المناسبة لك لدفع قيمة الطلب
              </p>
            </div>

            <div className="space-y-6">
              <div
                className="border-2 rounded-xl p-5 flex items-center gap-4 transition-all duration-200 cursor-pointer hover:shadow-md"
                style={{
                  borderColor: primaryColor,
                  backgroundColor: "#F9FDFE",
                }}
              >
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: primaryColor }}
                >
                  <div className="w-3 h-3 rounded-full bg-white"></div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 text-lg">
                    الدفع عند الاستلام
                  </h3>
                  <p className="text-gray-600 mt-1">
                    قم بدفع قيمة الطلب عند استلام المنتج من المندوب
                  </p>
                </div>
                <div className="text-gray-500">●</div>
              </div>

              {/* يمكن إضافة طرق دفع أخرى هنا */}

              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 border border-gray-300 text-gray-700 py-4 rounded-xl font-medium hover:bg-gray-50 transition-all duration-200"
                >
                  رجوع
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 text-white py-4 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                  style={{
                    backgroundColor: primaryColor,
                    hoverBackgroundColor: primaryDark,
                  }}
                >
                  متابعة إلى مراجعة الطلب
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3 – REVIEW */}
        {step === 3 && (
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 transition-all duration-300">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                تأكيد الطلب
              </h2>
              <p className="text-gray-600">
                راجع طلبك ثم اضغط على تأكيد لإرسال الطلب
              </p>
            </div>

            <div className="space-y-6">
              {/* تفاصيل المنتجات */}
              <div className="bg-gray-50 rounded-xl p-5">
                <h3 className="font-bold text-gray-800 text-lg mb-4">
                  تفاصيل المنتجات
                </h3>
                <div className="divide-y divide-gray-200">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center py-4"
                    >
                      <div className="flex-1">
                        <span className="font-medium text-gray-800">
                          {item.title}
                        </span>
                        <div className="text-sm text-gray-500 mt-1">
                          الكمية: {item.qty} × {item.price} جنيه
                        </div>
                      </div>
                      <div className="font-bold text-gray-800">
                        {item.price * item.qty} جنيه
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* معلومات التوصيل */}
              <div className="bg-gray-50 rounded-xl p-5">
                <h3 className="font-bold text-gray-800 text-lg mb-4">
                  معلومات التوصيل
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-500">الاسم</div>
                    <div className="font-medium">{userInfo.name}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">رقم الهاتف</div>
                    <div className="font-medium">{userInfo.phone}</div>
                  </div>
                  <div className="md:col-span-2">
                    <div className="text-sm text-gray-500">العنوان</div>
                    <div className="font-medium">{userInfo.address}</div>
                  </div>
                </div>
              </div>

              {/* طريقة الدفع */}
              <div className="bg-gray-50 rounded-xl p-5">
                <h3 className="font-bold text-gray-800 text-lg mb-2">
                  طريقة الدفع
                </h3>
                <div className="flex items-center">
                  <div
                    className="w-4 h-4 rounded-full mr-3"
                    style={{ backgroundColor: primaryColor }}
                  ></div>
                  <span className="font-medium">الدفع عند الاستلام</span>
                </div>
              </div>

              {/* الإجمالي */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-800">
                    الإجمالي النهائي
                  </span>
                  <div className="text-right">
                    <div className="text-3xl font-bold" style={{ color: primaryColor }}>
                      {totalPrice} جنيه
                    </div>
                    <div className="text-sm text-gray-500 mt-1">شامل ضريبة القيمة المضافة</div>
                  </div>
                </div>
              </div>

              {/* أزرار التأكيد */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 border border-gray-300 text-gray-700 py-4 rounded-xl font-medium hover:bg-gray-50 transition-all duration-200"
                >
                  رجوع
                </button>
                <button
                  disabled={isLoading}
                  onClick={handleConfirmOrder}
                  className="flex-1 text-white py-4 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: isLoading ? "#4A9AA9" : primaryColor,
                    hoverBackgroundColor: primaryDark,
                  }}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                      جاري تنفيذ الطلب...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <svg
                        className="w-5 h-5 ml-2"
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
                      تأكيد الطلب الآن
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* تذييل الصفحة */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>جميع معلوماتك محمية ومشفرة وفقاً لسياسة الخصوصية</p>
          <p className="mt-2">
            للاستفسارات:{" "}
            <a href="tel:+123456789" className="font-medium hover:underline" style={{ color: primaryColor }}>
              +123 456 789
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}