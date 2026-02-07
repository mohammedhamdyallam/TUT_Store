// NextJs
import { NextResponse } from "next/server";

// Prisma
import prisma from "@/lib/db";

// BcryptJs
import bcrypt from "bcryptjs";

// utils
import { verifyToken } from "@/utils/verifyToken";
import { EditUserSchema } from "@/utils/validationSchema";

/*
 * @method GET
 * @route ~/api/users/profile/:id
 * @desc Get user data
 * @access private
 */
export async function GET(req, { params }) {
  try {
    // Get id
    const { id } = await params;

    // Get user
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // Check user
    if (!user) {
      return NextResponse.json({ message: "المستخدم غير موجود" }, { status: 404 });
    }

    // Get user payload
    const userPayload = verifyToken();

    // Check user payload
    if (userPayload === null || userPayload.id !== user.id) {
      return NextResponse.json(
        { message: "غير مسموح لك، تم رفض الوصول" },
        { status: 403 },
      );
    }

    // Return profile
    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    console.log("Server Error", err);
    return NextResponse.json(
      { message: "خطأ في الخادم الداخلي" },
      { status: 500 },
    );
  }
}

/*
 * @method PUT
 * @route ~/api/users/profile/:id
 * @desc Edit user data
 * @access private
 */
export async function PUT(req, { params }) {
  try {
    // Data
    const body = await req.json();
    const { id } = await params;

    // Get user
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // Check user
    if (!user) {
      return NextResponse.json({ message: "المستخدم غير موجود" }, { status: 404 });
    }

    // Get user payload
    const userPayload = verifyToken();

    // Check user payload
    if (userPayload === null || userPayload.id !== user.id) {
      return NextResponse.json(
        { message: "غير مسموح لك، تم رفض الوصول" },
        { status: 403 },
      );
    }

    // Validation
    const validation = EditUserSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.issues[0].message },
        { status: 400 },
      );
    }

    // Hashing password
    if (body.password) {
      const salt = bcrypt.genSalt(10);
      body.password = await bcrypt.hash(body.password, salt);
    }

    // Edit user
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    console.log(updatedUser);

    // Return
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (err) {
    console.log("Server Error", err);
    return NextResponse.json(
      { message: "خطأ في الخادم الداخلي" },
      { status: 500 },
    );
  }
}

/*
 * @method DELETE
 * @route ~/api/users/profile/:id
 * @desc Delete user
 * @access private
 */
export async function DELETE(req, { params }) {
  try {
    // Data
    const { id } = await params;
    const userPayload = verifyToken();

    // Get user
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    // Check user
    if (!user) {
      return NextResponse.json({ message: "المستخدم غير موجود" }, { status: 404 });
    }

    // Delete user
    if (userPayload !== null && userPayload.id === user.id) {
      // Delete user
      await prisma.user.delete({ where: { id: parseInt(id) } });
      return NextResponse.json(
        { message: "تم حذف ملفك الشخصي" },
        { status: 200 },
      );
    }

    // Return message
    return NextResponse.json(
      { message: "يمكن للمستخدم فقط حذف ملفه الشخصي" },
      { status: 403 },
    );
  } catch (err) {
    console.log("Server Error", err);
    return NextResponse.json(
      { message: "خطأ في الخادم الداخلي" },
      { status: 500 },
    );
  }
}
