// NextJs
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

// Comps
import LoginForm from "./LoginForm";

export default async function LoginPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || "";
  if (token) {
    redirect("/");
  }

  return (
    <main className="min-h-screen bg-linear-to-b from-white to-[#F5F9FA] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8 h-151.5">
          {/* Card */}
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
