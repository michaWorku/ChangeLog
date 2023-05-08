import { NextFunction, Request, Response } from "express"
import prisma from "../db"
import { User } from "@prisma/client"

// Get all user products
export const getProducts = async (req: Request & { user: Partial<User> }, res: Response, next: NextFunction) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req?.user?.id
            },
            include: {
                products: true
            }
        })
    
        res.json({ data: user?.products })
    } catch (error) {
        next(error)
    }
}

// Get a product by id
export const getProduct = async (req: Request & { user: Partial<User> }, res: Response, next: NextFunction) => {
    try {
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
    } catch (error) {
        next(error)
    }
}

// Create a product
export const createProduct = async (req: Request & { user: Partial<User> }, res: Response, next: NextFunction) => {
    try {
        const product = await prisma.product.create({
            data: {
                name: req.body.name,
                user: {
                    connect: {
                        id: req.user.id
                    }
                }
            }
        })
    
        res.status(201).json({ data: product })
    } catch (err: any) {
        next(err)
    }
}

// Update a product
export const updateProduct = async (req: Request & { user: User }, res: Response, next: NextFunction) => {
    try {
        const product = await prisma.product.update({
            where: {
                id_userId: {
                    id: req.params.id,
                    userId: req?.user?.id
                }
            },
            data: {
                name: req.body.name,
            }
        })
    
        res.json({ data: product, message: 'product updated successfully' })
    } catch (error) {
       next(error) 
    }
}

// Delete a product
export const deleteProduct = async (req: Request & { user: User }, res: Response, next: NextFunction) => {
    try {
        const product = await prisma.product.delete({
            where: {
                id_userId: {
                    id: req.params.id,
                    userId: req.user.id
                }
            }
        })
    
        res.json({ message: 'product deleted successfully', data: product })
    } catch (error) {
       next(error) 
    }
}