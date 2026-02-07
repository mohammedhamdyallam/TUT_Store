// Dynamic API route
export const dynamic = "force-dynamic";

// NextJs
import { NextResponse } from "next/server";

// Utils
import { paginationItemPerPage } from "@/utils/constants";

/*
 * @method GET
 * @route ~/api/products/search?searchKey=value
 * @desc Search for a product
 * @access puplic
 */
export async function GET(req) {
  try {
    // Data
    const searchKey = req.nextUrl.searchParams.get("searchKey");

    let products;
    if (searchKey) {
      products = await prisma.product.findMany({
        where: {
          title: {
            contains: searchKey,
            mode: "insensitive",
          },
        },
      });
      console.log("if prodcuts", products);
    } else {
      products = await prisma.product.findMany({
        take: paginationItemPerPage,
      });
    }

    // Return
    return NextResponse.json(products, { status: 200 });
  } catch (err) {
    console.log("Server Error", err);
    return NextResponse.json(
      { message: "خطأ في الخادم الداخلي" },
      { status: 500 },
    );
  }
}
