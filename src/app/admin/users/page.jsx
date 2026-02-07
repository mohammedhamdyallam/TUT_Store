// API Calls
import { getUsers } from "@/apiCalls/usersApiCalls";

export default async function AdminUsers({ searchParams }) {
  const { page } = await searchParams;
  const users = await getUsers(page);

  if (!users) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white p-4">
        <div className="text-center">
          <div className="inline-block p-4 rounded-full bg-red-50 mb-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-red-100 text-red-600 text-xl font-bold">
              !
            </div>
          </div>
          <p className="text-lg font-medium text-gray-800 mb-2">تعذر تحميل المستخدمين</p>
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">إدارة المستخدمين</h1>
            <p className="text-gray-600">عرض وإدارة جميع مستخدمي النظام</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="px-5 py-2.5 rounded-xl text-white font-medium hover:shadow-lg transition-all flex items-center gap-2"
              style={{ backgroundColor: "#6BB7C7" }}>
              <span>+</span>
              إضافة مستخدم جديد
            </button>
            
            <div className="px-4 py-2 bg-white rounded-xl shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500">إجمالي المستخدمين</p>
              <p className="text-lg font-bold" style={{ color: "#6BB7C7" }}>
                {users.length}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">المسؤولين</p>
                <p className="text-2xl font-bold" style={{ color: "#6BB7C7" }}>
                  {users.filter(u => u.role === "admin").length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full" style={{ backgroundColor: "#6BB7C7" }}>
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-white text-lg">👑</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">المستخدمين العاديين</p>
                <p className="text-2xl font-bold text-green-600">
                  {users.filter(u => u.role === "user").length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <div className="text-green-600 text-lg">👤</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">المحررين</p>
                <p className="text-2xl font-bold text-blue-600">
                  {users.filter(u => u.role === "editor").length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <div className="text-blue-600 text-lg">✏️</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">جدد هذا الشهر</p>
                <p className="text-2xl font-bold text-purple-600">
                  {users.filter(u => {
                    const userDate = new Date(u.createdAt);
                    const now = new Date();
                    return userDate.getMonth() === now.getMonth() && 
                           userDate.getFullYear() === now.getFullYear();
                  }).length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <div className="text-purple-600 text-lg">🆕</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-xl font-bold text-gray-900">قائمة المستخدمين</h2>
            
            <div className="flex items-center gap-3">
              <select className="px-4 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2" 
                style={{ focusRingColor: "#6BB7C7" }}>
                <option>جميع الأدوار</option>
                <option>مسؤول</option>
                <option>مستخدم</option>
                <option>محرر</option>
              </select>
              
              <div className="relative">
                <input
                  type="text"
                  placeholder="بحث عن مستخدم..."
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
                <th className="px-6 py-4 text-white font-semibold text-sm">المستخدم</th>
                <th className="px-6 py-4 text-white font-semibold text-sm">البريد الإلكتروني</th>
                <th className="px-6 py-4 text-white font-semibold text-sm">الدور</th>
                <th className="px-6 py-4 text-white font-semibold text-sm">الحالة</th>
                <th className="px-6 py-4 text-white font-semibold text-sm">تاريخ الإنشاء</th>
                <th className="px-6 py-4 text-white font-semibold text-sm">الإجراءات</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user.id}
                  className={`
                    border-b border-gray-100 transition-all duration-200 hover:bg-gray-50/50
                    ${index % 2 === 0 ? "bg-white" : "bg-gray-50/30"}
                  `}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold
                        ${user.role === "admin" 
                          ? "bg-gradient-to-r from-[#6BB7C7] to-[#4A9AA9]"
                          : user.role === "editor"
                            ? "bg-gradient-to-r from-blue-500 to-blue-600"
                            : "bg-gradient-to-r from-gray-500 to-gray-600"
                        }`}>
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">ID: #{user.id}</div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center">
                        ✉️
                      </div>
                      <span className="text-gray-700">{user.email}</span>
                    </div>
                    {user.emailVerified && (
                      <div className="text-xs text-green-600 mt-1 flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        تم التحقق
                      </div>
                    )}
                  </td>

                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
                      ${user.role === "admin"
                        ? "bg-gradient-to-r from-[#6BB7C7]/10 to-[#4A9AA9]/10 text-[#2A7FAF] border border-[#6BB7C7]/20"
                        : user.role === "editor"
                          ? "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border border-blue-200"
                          : "bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 border border-gray-200"
                      }`}>
                      <div className={`w-2 h-2 rounded-full
                        ${user.role === "admin" ? "bg-[#6BB7C7]"
                          : user.role === "editor" ? "bg-blue-500"
                          : "bg-gray-500"
                        }`}></div>
                      {user.role === "admin" ? "مسؤول"
                        : user.role === "editor" ? "محرر"
                        : "مستخدم"}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${user.isActive ? "bg-green-500" : "bg-red-500"}`}></div>
                      <span className={`text-sm font-medium ${user.isActive ? "text-green-700" : "text-red-700"}`}>
                        {user.isActive ? "نشط" : "غير نشط"}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-700">
                      {new Date(user.createdAt).toLocaleDateString("ar-EG", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    <div className="text-xs text-gray-500">
                      منذ {Math.floor((new Date() - new Date(user.createdAt)) / (1000 * 60 * 60 * 24))} يوم
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 rounded-lg text-gray-600 hover:text-[#6BB7C7] hover:bg-[#6BB7C7]/10 transition-colors"
                        title="عرض التفاصيل">
                        👁️
                      </button>
                      <button className="p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                        title="تعديل">
                        ✏️
                      </button>
                      <button className="p-2 rounded-lg text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="حذف">
                        🗑️
                      </button>
                      <button className="p-2 rounded-lg text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors"
                        title="إرسال رسالة">
                        💬
                      </button>
                    </div>
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
              عرض <span className="font-medium">{users.length}</span> من <span className="font-medium">{users.length}</span> مستخدم
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

      {/* User Cards View (Alternative for Mobile) */}
      <div className="md:hidden mt-6 space-y-4">
        {users.map((user) => (
          <div key={user.id} className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold
                  ${user.role === "admin" 
                    ? "bg-gradient-to-r from-[#6BB7C7] to-[#4A9AA9]"
                    : user.role === "editor"
                      ? "bg-gradient-to-r from-blue-500 to-blue-600"
                      : "bg-gradient-to-r from-gray-500 to-gray-600"
                  }`}>
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{user.name}</h3>
                  <p className="text-sm text-gray-500">ID: #{user.id}</p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium
                ${user.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                {user.isActive ? "نشط" : "غير نشط"}
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center">
                  ✉️
                </div>
                <span className="text-gray-700">{user.email}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <div className={`px-3 py-1.5 rounded-lg text-sm font-medium flex-1 text-center
                  ${user.role === "admin"
                    ? "bg-gradient-to-r from-[#6BB7C7]/10 to-[#4A9AA9]/10 text-[#2A7FAF]"
                    : user.role === "editor"
                      ? "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700"
                      : "bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700"
                  }`}>
                  {user.role === "admin" ? "مسؤول"
                    : user.role === "editor" ? "محرر"
                    : "مستخدم"}
                </div>
              </div>
              
              <div className="text-sm text-gray-600">
                تاريخ الإنشاء: {new Date(user.createdAt).toLocaleDateString("ar-EG")}
              </div>
              
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <button className="p-2 rounded-lg text-gray-600 hover:text-[#6BB7C7] hover:bg-[#6BB7C7]/10 transition-colors">
                  👁️ عرض
                </button>
                <button className="p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                  ✏️ تعديل
                </button>
                <button className="p-2 rounded-lg text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors">
                  💬 رسالة
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State (if needed) */}
      {users.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-100">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" 
            style={{ backgroundColor: "#6BB7C7" }}>
            <div className="text-white text-3xl">👥</div>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">لا يوجد مستخدمين</h3>
          <p className="text-gray-600 mb-6">لم يتم العثور على أي مستخدمين حتى الآن</p>
          <button className="px-6 py-3 rounded-xl text-white font-medium hover:shadow-lg transition-all"
            style={{ backgroundColor: "#6BB7C7" }}>
            إضافة مستخدم جديد
          </button>
        </div>
      )}
    </div>
  );
}