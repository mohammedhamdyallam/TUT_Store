export async function getOrders(page) {
  const res = await fetch(`${process.env.api}/api/orders?page=${page}`, {
    cache: "no-store",
    credentials: "include",
  });

  if (!res.ok) return null;
  return res.json();
}
