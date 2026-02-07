// NextJs
import { NextResponse } from "next/server";

// Prisma
import prisma from "@/lib/db";

// Utils
import { verifyToken } from "@/utils/verifyToken";

/*
 * @method GET
 * @route ~/api/products/:id
 * @desc Add Single Product By Id
 * @access puplic
 */
export async function GET(req, { params }) {
  try {
    const { id } = await params;
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
    });
    return NextResponse.json(product, { status: 200 });
  } catch (err) {
    console.log("Server Error", err);
    return NextResponse.json({ message: "خطأ في الخادم الداخلي", status: 500 });
  }
}

/*
 * @method PUT
 * @route ~/api/products/:id
 * @desc Edit Product
 * @access puplic
 */
export async function PUT(req, { params }) {
  try {
    // Data
    const body = await req.json();
    const { id } = await params;
    const user = verifyToken(req);

    // check user is admin
    if (user === null || user.role === "user") {
      return NextResponse.json(
        { message: "مسموح للمسؤولين فقط، تم رفض الوصول" },
        { status: 403 },
      );
    }

    // Update product
    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        title: body.title,
        originalPrice: body.originalPrice,
        price: body.price,
        discount: body.discount,
        category: body.category,
        images: body.images,
        stock: body.stock,
      },
    });

    // Return
    return NextResponse.json(updatedProduct, { status: 200 });
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
 * @route ~/api/products/:id
 * @desc Delete Product
 * @access puplic
 */
export async function DELETE(req, { params }) {
  try {
    // Data
    const { id } = await params;
    const user = verifyToken(req);

    // check user is admin
    if (user === null || user.role === "user") {
      return NextResponse.json(
        { message: "مسموح للمسؤولين فقط، تم رفض الوصول" },
        { status: 403 },
      );
    }

    // Check product
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
    });
    if (!product) {
      return NextResponse.json({ message: "المنتج غير موجود" }, { status: 404 })
    }

    // Delete product
    const deletedProduct = await prisma.product.delete({
      where: { id: parseInt(id) },
    });

    // Return
    return NextResponse.json(deletedProduct, { status: 200 });
  } catch (err) {
    console.log("Server Error", err);
    return NextResponse.json(
      { message: "خطأ في الخادم الداخلي" },
      { status: 500 },
    );
  }
}
