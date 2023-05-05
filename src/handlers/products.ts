import { Request, Response } from "express"
import prisma from "../db"
import { User } from "@prisma/client"

// Get all user products
export const getProducts = async (req: Request & { user: Partial<User> }, res: Response) => {
    const user = await prisma.user.findUnique({
        where: {
            id: req?.user?.id
        },
        include: {
            products: true
        }
    })

    res.json({ data: user?.products })
}

// Get a product by id
export const getProduct = async (req: Request & { user: Partial<User> }, res: Response) => {
    const product = await prisma.product.findFirst({
        where: {
            id: req?.params?.id,
            userId: req.user.id
        },
        include: {
            updates: true
        }
    })

    res.json({ data: product })
}