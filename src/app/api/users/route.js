// Dynamic API route
export const dynamic = "force-dynamic";

// NextJs
import { NextResponse } from "next/server";

// Prisma
import prisma from "@/lib/db";

// Utils
import { allowedRoles, paginationItemPerPage } from "@/utils/constants";
import { verifyToken } from "@/utils/verifyToken";

/*
 * @method GET
 * @route ~/api/users?page=value
 * @desc Create new user
 * @access protected (admin | owner)
 */
export async function GET(req) {
  try {
    // Data
    const userPayload = verifyToken();
    const page = req.nextUrl.searchParams.get("page") || "1";

    // Check user payload
    if (userPayload === null || !allowedRoles.includes(userPayload.role)) {
      return NextResponse.json(
        { message: "غير مسموح لك، تم رفض الوصول" },
        { status: 403 },
      );
    }

    // Get users
    const users = await prisma.user.findMany({
      skip: paginationItemPerPage * (parseInt(page) - 1),
      take: paginationItemPerPage,
    });

    // Return
    return NextResponse.json(users, { status: 200 });
  } catch (err) {
    console.log("Server Error", err);
    return NextResponse.json(
      { message: "خطأ في الخادم الداخلي" },
      { status: 500 },
    );
  }
}
