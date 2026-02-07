// NextJs
import { NextResponse } from "next/server";

// Prisma
import prisma from "@/lib/db";

// Utils
import { paginationItemPerPage } from "@/utils/constants";
import { verifyToken } from "@/utils/verifyToken";
import cloudinary from "@/utils/cloudinary";

/*
 * @method GET
 * @route ~/api/products?page=value
 * @desc Get Products
 * @access puplic
 */
export async function GET(req) {
  try {
    // Data
    const page = req.nextUrl.searchParams.get("page") || "1";

    const products = await prisma.product.findMany({
      skip: paginationItemPerPage * (parseInt(page) - 1),
      take: paginationItemPerPage,
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(products, { status: 200 });
  } catch (err) {
    console.log("Server Error", err);
    return NextResponse.json(
      { message: "خطأ في الخادم الداخلي" },
      { status: 500 },
    );
  }
}

/*
 * @method POST
 * @route ~/api/products
 * @desc Add Product
 * @access private only admin
 */
export async function POST(req) {
  try {
    const user = verifyToken();

    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { message: "مسموح للمسؤولين فقط" },
        { status: 403 }
      );
    }

    const formData = await req.formData();

    const title = formData.get("title");
    const category = formData.get("category");
    const price = Number(formData.get("price"));
    const originalPrice = Number(formData.get("originalPrice"));
    const discount = Number(formData.get("discount"));
    const stock = Number(formData.get("stock"));

    if (!title) {
      return NextResponse.json(
        { message: "اسم المنتج مطلوب" },
        { status: 400 }
      );
    }

    // images
    const imagesFiles = formData.getAll("images");
    const imageUrls = [];

    for (const file of imagesFiles) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "products" }, (err, result) => {
            if (err) reject(err);
            resolve(result);
          })
          .end(buffer);
      });

      imageUrls.push(uploadResult.secure_url);
      console.log(imageUrls);
    }

    const newProduct = await prisma.product.create({
      data: {
        title,
        category,
        price,
        originalPrice,
        discount,
        stock,
        images: imageUrls,
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (err) {
    console.error("Server Error:", err);
    return NextResponse.json(
      { message: "خطأ في الخادم الداخلي" },
      { status: 500 }
    );
  }
}
