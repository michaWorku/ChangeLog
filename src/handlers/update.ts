import { Request, Response } from "express"
import prisma from "../db"
import { Update, User } from "@prisma/client"

// Get all updates belogns to signed user
export const getUpdates = async (req: Request & { user: Partial<User> }, res: Response) => {

    const updates = await prisma.update.findMany({
        where: {
            product: {
                user: {
                    id: req?.user?.id
                }
            }
        }
    })

    res.json({ data: updates })
}

// Get a update by id
export const getUpdate = async (req: Request, res: Response) => {
    const update = await prisma.update.findUnique({
        where: {
            id: req?.params?.id
        }
    })

    res.json({ data: update })
}

// Create an update
export const createUpdate = async (req: Request & { user: Partial<User> }, res: Response) => {
    const product = await prisma.product.findUnique({
        where: {
            id: req?.body?.productId
        }
    })
    if (!product) {
        return res.json({ message: 'Product not found' })
    }

    const update = await prisma.update.create({
        data: {
            body: req?.body?.body,
            title: req?.body?.title,
            asset: req?.body?.asset,
            product: {
                connect: {
                    id: product?.id
                }
            }
        }
    })

    res.status(201).json({ data: update })
}

// Update an update
export const updateUpdate = async (req: Request & { user: User }, res: Response) => {
    const products = await prisma.product.findMany({
        where: {
            userId: req.user.id
        },
        include: {
            updates: true
        }
    })

    const updates = products.reduce((allUpdates: any, product) => { return [...allUpdates, ...product?.updates] }, [])

    const match = updates.find((update: Update) => update.id === req?.params?.id)

    if (!match) {
        return res.json({ message: 'No update found' })
    }

    const update = await prisma.update.update({
        where: {
            id: req?.params?.id
        },
        data: req?.body
    })

    res.json({ data: update, message: 'An update updated successfully' })
}

// Delete an update
export const deleteUpdate = async (req: Request & {
    user: User
}, res: Response) => {
    const products = await prisma.product.findMany({
        where: {
            userId: req.user.id
        },
        include: {
            updates: true
        }
    })

    const updates = products.reduce((allUpdates: any, product) => { return [...allUpdates, ...product?.updates] }, [])

    const match = updates.find((update: Update) => update.id === req?.params?.id)

    if (!match) {
        return res.json({ message: 'No update found' })
    }

    const update = await prisma.update.delete({
        where: {
            id: req?.params?.id
        }
    })

    res.json({ message: 'an update deleted successfully', data: update })
}