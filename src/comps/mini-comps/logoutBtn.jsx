// NextJs
import { useRouter } from "next/navigation";

// Axios
import axios from "axios";

// Icons
import { FiLogOut } from "react-icons/fi";

export default function LogoutBtn() {
  // Router
  const router = useRouter();

  // Handle Logout
  async function handleLogout() {
    try {
      await axios.get(`http://localhost:3000/api/users/logout`);
      router.push("/");
      router.refresh();
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <button
      onClick={handleLogout}
      className="
    flex items-center gap-2
    px-4 py-2 rounded-full
    text-sm font-medium
    text-[#6BB7C7]
    border border-[#6BB7C7]
    hover:bg-[#6BB7C7] hover:text-white
    transition-all duration-200
  "
    >
      <FiLogOut size={16} />
      تسجيل الخروج
    </button>
  );
}
