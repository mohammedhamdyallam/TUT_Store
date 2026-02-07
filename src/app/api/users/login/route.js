// NextJs
import { NextResponse } from "next/server";

// Prisma
import prisma from "@/lib/db";

// BcryptJs
import bcrypt from "bcryptjs";

// Utils
import { loginSchema } from "@/utils/validationSchema";
import { setCookie } from "@/utils/generateToken";

/*
 * @method POST
 * @route ~/api/users/login
 * @desc Login user
 * @access puplic
 */
export async function POST(req) {
  try {
    // Body
    const body = await req.json();

    // Validation
    const validation = loginSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.issues[0].message },
        { status: 400 },
      );
    }

    // Check user
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    if (!user) {
      return NextResponse.json(
        { message: "البريد الإلكتروني أو كلمة المرور غير صحيحة" },
        { status: 400 },
      );
    }

    // Check password
    const isPasswordCorrect = await bcrypt.compare(
      body.password,
      user.password,
    );
    if (!isPasswordCorrect) {
      return NextResponse.json(
        { message: "البريد الإلكتروني أو كلمة المرور غير صحيحة" },
        { status: 400 },
      );
    }

    // JWT Token
    const jwtPayload = {
      id: user.id,
      name: user.name,
      role: user.role,
    };

    // Save token to cookies
    const cookie = setCookie(jwtPayload);

    // Return
    return NextResponse.json(
      { message: "تم التوثيق بنجاح" },
      { status: 200, headers: { "Set-Cookie": cookie } },
    );
  } catch (err) {
    console.log("Server Error", err);
    return NextResponse.json(
      { message: "خطأ في الخادم الداخلي" },
      { status: 500 },
    );
  }
}
