// Dynamic API route to get the count of products in the database
export const dynamic = "force-dynamic";

// NextJs
import { NextResponse } from "next/server";

// Utils
import prisma from "@/lib/db";

/*
 * @method GET
 * @route ~/api/products/count
 * @desc Search for a product
 * @access puplic
 */
export async function GET() {
  try {
    const productsCount = await prisma.product.count();

    return NextResponse.json({ productsCount }, { status: 200 });
  } catch (err) {
    console.log("Server Error", err);
    return NextResponse.json(
      { message: "خطأ في الخادم الداخلي" },
      { status: 500 },
    );
  }
}
