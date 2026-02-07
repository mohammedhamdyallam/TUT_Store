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
