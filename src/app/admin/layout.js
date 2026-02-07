// Comps
import AdminAsideBar from "./adminAsidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex">
      {/* Sidebar */}
      <AdminAsideBar />

      {/* Page Content */}
      <main className="flex-1 min-h-screen md:mr-64 bg-gray-50 p-4">
        {children}
      </main>
    </div>
  );
}
