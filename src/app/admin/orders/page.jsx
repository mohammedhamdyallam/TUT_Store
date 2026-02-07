// API Calls
import { getOrders } from "@/apiCalls/ordersApiCall";

export default async function AdminOrders() {
  const orders = await getOrders(1);

  if (!orders) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-gray-50 to-white p-4">
        <div className="text-center">
          <div className="inline-block p-4 rounded-full bg-red-50 mb-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-red-100 text-red-600 text-xl font-bold">
              !
            </div>
          </div>
          <p className="text-lg font-medium text-gray-800 mb-2">تعذر تحميل الطلبات</p>
          <p className="text-gray-600">يرجى المحاولة مرة أخرى</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-4 md:p-6">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">إدارة الطلبات</h1>
            <p className="text-gray-600">عرض وإدارة جميع طلبات العملاء</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-white rounded-xl shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500">إجمالي الطلبات</p>
              <p className="text-lg font-bold" style={{ color: "#6BB7C7" }}>
                {orders.length}
              </p>
            </div>
            
            <div className="px-4 py-2 bg-white rounded-xl shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500">طلبات اليوم</p>
              <p className="text-lg font-bold" style={{ color: "#6BB7C7" }}>
                {orders.filter(order => {
                  const today = new Date();
                  const orderDate = new Date(order.createdAt);
                  return orderDate.toDateString() === today.toDateString();
                }).length}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">قيد الانتظار</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {orders.filter(o => o.status === "pending").length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">مدفوع</p>
                <p className="text-2xl font-bold" style={{ color: "#6BB7C7" }}>
                  {orders.filter(o => o.status === "paid").length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full" style={{ backgroundColor: "#6BB7C7" }}>
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-white/30 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">مشحون</p>
                <p className="text-2xl font-bold text-green-600">
                  {orders.filter(o => o.status === "shipped").length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">ملغي</p>
                <p className="text-2xl font-bold text-red-600">
                  {orders.filter(o => o.status === "cancelled").length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-xl font-bold text-gray-900">جميع الطلبات</h2>
            
            <div className="flex items-center gap-3">
              <select className="px-4 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2" style={{ focusRingColor: "#6BB7C7" }}>
                <option>جميع الحالات</option>
                <option>قيد الانتظار</option>
                <option>مدفوع</option>
                <option>مشحون</option>
                <option>ملغي</option>
              </select>
              
              <div className="relative">
                <input
                  type="text"
                  placeholder="بحث عن طلب..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2"
                  style={{ focusRingColor: "#6BB7C7" }}
                />
                <div className="absolute right-3 top-2.5 text-gray-400">
                  🔍
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-right" style={{ backgroundColor: "#6BB7C7" }}>
                <th className="px-6 py-4 text-white font-semibold text-sm">رقم الطلب</th>
                <th className="px-6 py-4 text-white font-semibold text-sm">العميل</th>
                <th className="px-6 py-4 text-white font-semibold text-sm">التواصل</th>
                <th className="px-6 py-4 text-white font-semibold text-sm">طريقة الدفع</th>
                <th className="px-6 py-4 text-white font-semibold text-sm">الإجمالي</th>
                <th className="px-6 py-4 text-white font-semibold text-sm">الحالة</th>
                <th className="px-6 py-4 text-white font-semibold text-sm">التاريخ</th>
                <th className="px-6 py-4 text-white font-semibold text-sm">العناصر</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order, index) => (
                <tr
                  key={order.id}
                  className={`
                    border-b border-gray-100 transition-all duration-200 hover:bg-gray-50/50
                    ${index % 2 === 0 ? "bg-white" : "bg-gray-50/30"}
                  `}
                >
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-900">#{order.id}</div>
                  </td>

                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">{order.customerName}</div>
                      <div className="text-sm text-gray-500 mt-1 truncate max-w-[150px]">{order.customerAddress}</div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center">
                          📱
                        </div>
                        <span className="text-sm text-gray-700">{order.customerPhone || "-"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center">
                          ✉️
                        </div>
                        <span className="text-sm text-gray-700 truncate max-w-[150px]">{order.customerEmail}</span>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm" 
                      style={{ backgroundColor: "#6BB7C7", color: "white" }}>
                      {order.paymentMethod === "cash"
                        ? "💵 كاش"
                        : order.paymentMethod === "card"
                          ? "💳 بطاقة"
                          : order.paymentMethod === "COD"
                            ? "📦 الدفع عند الاستلام"
                            : "🔖 أخرى"}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="font-bold text-lg" style={{ color: "#6BB7C7" }}>
                      {order.totalPrice} ج.م
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
                      ${order.status === "pending"
                        ? "bg-yellow-50 text-yellow-700 border border-yellow-200"
                        : order.status === "paid"
                          ? "bg-blue-50 text-blue-700 border border-blue-200"
                          : order.status === "shipped"
                            ? "bg-green-50 text-green-700 border border-green-200"
                            : "bg-red-50 text-red-700 border border-red-200"
                      }`}>
                      <div className={`w-2 h-2 rounded-full
                        ${order.status === "pending" ? "bg-yellow-500"
                          : order.status === "paid" ? "bg-blue-500"
                          : order.status === "shipped" ? "bg-green-500"
                          : "bg-red-500"
                        }`}></div>
                      {order.status === "pending"
                        ? "قيد الانتظار"
                        : order.status === "paid"
                          ? "مدفوع"
                          : order.status === "shipped"
                            ? "مشحون"
                            : "ملغي"}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-700">
                      {new Date(order.createdAt).toLocaleDateString("ar-EG", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(order.createdAt).toLocaleTimeString("ar-EG", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <details className="group">
                      <summary className="flex items-center gap-2 cursor-pointer text-sm font-medium" 
                        style={{ color: "#6BB7C7" }}>
                        <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center group-open:rotate-180 transition-transform">
                          ▼
                        </div>
                        عرض العناصر ({order.items.length})
                      </summary>
                      <div className="mt-3 p-4 bg-gray-50 rounded-xl space-y-2">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-100">
                            <div className="flex-1">
                              <div className="font-medium text-gray-900">{item.product.title}</div>
                              <div className="text-sm text-gray-500 mt-1">السعر: {item.price} ج.م</div>
                            </div>
                            <div className="px-3 py-1 rounded-full text-sm font-medium" 
                              style={{ backgroundColor: "#6BB7C7", color: "white" }}>
                              × {item.quantity}
                            </div>
                          </div>
                        ))}
                        <div className="pt-2 border-t border-gray-200">
                          <div className="flex justify-between font-medium text-gray-900">
                            <span>المجموع الفرعي:</span>
                            <span>{order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)} ج.م</span>
                          </div>
                        </div>
                      </div>
                    </details>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="p-6 border-t border-gray-100 bg-gray-50/50">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="text-sm text-gray-600">
              عرض <span className="font-medium">{orders.length}</span> من <span className="font-medium">{orders.length}</span> طلب
            </div>
            
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 border border-gray-300 rounded-xl text-sm hover:bg-gray-50 transition-colors">
                السابق
              </button>
              <button className="px-4 py-2 rounded-xl text-sm text-white hover:opacity-90 transition-all"
                style={{ backgroundColor: "#6BB7C7" }}>
                1
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-xl text-sm hover:bg-gray-50 transition-colors">
                التالي
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Empty State (if needed) */}
      {orders.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-100">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" 
            style={{ backgroundColor: "#6BB7C7" }}>
            <div className="text-white text-3xl">📦</div>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">لا توجد طلبات</h3>
          <p className="text-gray-600 mb-6">لم يتم العثور على أي طلبات حتى الآن</p>
          <button className="px-6 py-3 rounded-xl text-white font-medium hover:shadow-lg transition-all"
            style={{ backgroundColor: "#6BB7C7" }}>
            تحديث القائمة
          </button>
        </div>
      )}
    </div>
  );
}