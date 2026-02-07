import { cookies } from "next/headers";

export async function getUsers(page) {
  const cookieStore = await cookies();

  const res = await fetch(
    `${process.env.api}/api/users?page=${page}`,
    {
      cache: "no-store",
      headers: {
        Cookie: cookieStore.toString(),
      },
    }
  );

  if (!res.ok) {
    console.error("API Error:", res.status);
    return null;
  }

  return res.json();
}
