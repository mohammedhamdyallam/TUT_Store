// NextJs
import { NextResponse } from "next/server";

// Prisma
import prisma from "@/lib/db";

// BcryptJs
import bcrypt from "bcryptjs";

// Utils
import { registerSchema } from "@/utils/validationSchema";
import { setCookie } from "@/utils/generateToken";

/*
 * @method POST
 * @route ~/api/users/register
 * @desc Create new user
 * @access puplic
 */
export async function POST(req) {
  try {
    const body = await req.json();

    // Validation
    const validation = registerSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.issues[0].message },
        { status: 400 },
      );
    }

    // Check if user already registered
    const user = await prisma.user.findUnique({
      where: { email: body.email },
    });
    if (user) {
      return NextResponse.json(
        { message: "البريد الإلكتروني موجود بالفعل" },
        { status: 400 },
      );
    }

    // Hashing Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);

    // Create user
    const newUser = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        role: true,
        isVerified: true,
      },
    });

    // JWT Token
    const jwtPayload = {
      id: newUser.id,
      name: newUser.name,
      role: newUser.role,
    };

    // Save token to cookies
    const cookie = setCookie(jwtPayload);

    // Create Response
    return NextResponse.json(
      { ...newUser, message: "تم التسجيل والتوثيق بنجاح" },
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
