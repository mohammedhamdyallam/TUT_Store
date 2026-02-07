// NextJs
import { cookies } from "next/headers";

// Comps
import HeaderClient from "./headerClient";

// Utils
import { verifyTokenClient } from "@/utils/verifyToken";

export default async function Header() {
  // Cookies
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || "";
  const userPayload = verifyTokenClient(token);

  return (
    <HeaderClient userPayload={userPayload} />
  );
}
