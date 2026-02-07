// Dynamic API route
export const dynamic = "force-dynamic";

// NextJs
import { NextResponse } from "next/server";

/*
 * @method GET
 * @route ~/api/users/logout
 * @desc Logout user
 * @access private
 */
export async function GET() {
  try {
    const res = NextResponse.json(
      { message: "تم تسجيل الخروج" },
      { status: 200 }
    );

    res.cookies.delete("token");

    return res;
  } catch (err) {
    console.log("Server Error", err);
    return NextResponse.json(
      { message: "خطأ في الخادم الداخلي" },
      { status: 500 },
    );
  }
}
