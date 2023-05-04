import { createHash } from "crypto";
import { Request, Response } from "express";
import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";

export const createUser = async (req: Request, res: Response) => {
    const hashedPassword = await hashPassword(req.body.password)

    const user = await prisma.user.create({
        data: { ...req.body, password: hashedPassword }
    })

    const token = createJWT(user)

    res.status(201).json({ token })
}

export const signin = async (req: Request, res: Response) => {
    const user = await prisma.user.findUnique({
        where: {
            email: req.body.email
        }
    })

    if (user) {
        const isValid = await comparePasswords(req.body.password, user?.password)
        if (!isValid) {
            res.status(401).json({ message: 'invalid credentials' })
        }

        const token = createJWT(user)
        res.status(200).json({ token })
    }

    res.status(404).json({ message: 'User not found' })
}