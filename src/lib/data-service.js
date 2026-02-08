import prisma from "@/lib/db";
import { paginationItemPerPage } from "@/utils/constants";

export async function getAllOrders(page) {
    const orders = await prisma.order.findMany({
        skip: paginationItemPerPage * (page - 1),
        take: paginationItemPerPage,
        orderBy: { createdAt: "desc" },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
            items: {
                include: {
                    product: true,
                },
            },
        },
    });

    return orders;
}

export async function getAllProducts(page) {
    const products = await prisma.product.findMany({
        skip: paginationItemPerPage * (parseInt(page) - 1),
        take: paginationItemPerPage,
        orderBy: { createdAt: "desc" },
    });

    return products;
}

// export async function getProductsCountDB() {
//     const productsCount = await prisma.product.count();
//     return productsCount;
// }

export async function getSearchProductsDB(searchKey) {
    if (searchKey) {
        const products = await prisma.product.findMany({
            where: {
                title: {
                    contains: searchKey,
                    mode: "insensitive",
                },
            },
        });
        return products;
    } else {
        const products = await prisma.product.findMany({
            take: paginationItemPerPage,
        });
        return products;
    }
}
