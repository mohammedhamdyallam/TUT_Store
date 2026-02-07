// NextJs
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

// Comps
import ProductsClient from "./productsClient";

// API calls
import { getProducts, getProductsCount } from "@/apiCalls/productsApiCalls";

// Utils
import { allowedRoles } from "@/utils/constants";
import { paginationItemPerPage } from "@/utils/constants";
import { verifyTokenClient } from "@/utils/verifyToken";

export default async function AdminProducts({ searchParams }) {
  const { page } = await searchParams;
  const products = await getProducts(page);
  const productsCount = await getProductsCount();
  const pages = Math.ceil(productsCount / paginationItemPerPage);

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || "";
  const userPayload = verifyTokenClient(token);
  if (!token || !allowedRoles.includes(userPayload.role)) {
    redirect("/");
  }

  return (
    <>
      <ProductsClient
        products={products}
        page={page}
        productsCount={productsCount}
        pages={pages}
      />
    </>
  );
}
