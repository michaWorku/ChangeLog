import { createHash } from "crypto";
import { Request, Response } from "express";
import prisma from "../db";
import { createJWT } from "../modules/auth";

export const createUser = async (req: Request, res: Response) => {
    const hassPassword = createHash(req.body.password)

    const user =  await prisma.user.create({
        data: { ...req.body, password: hassPassword }
    })

    const token = createJWT(user)

    res.json({token})
}