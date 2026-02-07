export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { verifyToken } from "@/utils/verifyToken";
import { paginationItemPerPage } from "@/utils/constants";

export async function GET(req) {
  try {
    const page = Number(req.nextUrl.searchParams.get("page") || 1);

    const orders = await prisma.order.findMany({
      skip: paginationItemPerPage * (page - 1),
      take: paginationItemPerPage,
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
        items: {
          include: { product: true },
        },
      },
    });

    return NextResponse.json(orders, { status: 200 });
  } catch (err) {
    console.error("Server Error GET /api/orders:", err);
    return NextResponse.json({ message: "خطأ في الخادم الداخلي" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const user = verifyToken();

    if (!user) {
      return NextResponse.json({ message: "يرجى تسجيل الدخول أولاً" }, { status: 401 });
    }

    if (!body.cartItems || body.cartItems.length === 0) {
      return NextResponse.json({ message: "عربة التسوق فارغة" }, { status: 400 });
    }

    const productIds = body.cartItems.map((item) => Number(item.id));
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    const orderItems = body.cartItems.map((item) => {
      const productId = Number(item.id);
      const product = products.find((p) => p.id === productId);

      if (!product) throw new Error("المنتج غير موجود");

      return { productId: product.id, quantity: item.qty, price: product.price };
    });

    const newOrder = await prisma.order.create({
      data: {
        userId: user.id,
        totalPrice: body.totalPrice,
        paymentMethod: body.paymentMethod,
        status: "pending",
        customerName: body.userInfo.name,
        customerPhone: body.userInfo.phone,
        customerEmail: body.userInfo.email,
        customerAddress: body.userInfo.address,
        items: { create: orderItems },
      },
    });

    return NextResponse.json(newOrder, { status: 201 });
  } catch (err) {
    console.error("Server Error POST /api/orders:", err);
    return NextResponse.json({ message: "خطأ في الخادم الداخلي" }, { status: 500 });
  }
}
