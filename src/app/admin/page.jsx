// NextJs
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

// Utils
import { verifyTokenClient } from "@/utils/verifyToken";
import { allowedRoles } from "@/utils/constants";

export default async function Dashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || "";
  const userPayload = verifyTokenClient(token);
  if (!token || !allowedRoles.includes(userPayload.role)) {
    redirect("/");
  }

  return <></>;
}
