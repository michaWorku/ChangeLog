import { User } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'

export const comparePasswords = (password:string, hash: string)=>{
    return bcrypt.compare(password, hash)
}

export const hashPassword = (password:string)=>{
    return bcrypt.hash(password, 8)
}

export const createJWT = (user: User) => {
    return jwt.sign({ id: user?.id, email: user?.email }, process.env.JWT_SECRET as string)
}

export const protect =(req: any, res: Response, next: NextFunction)=>{
    const bearer = req.headers.authorization
    console.log({bearer})
    if(!bearer){
        res.status(401).json({message: 'Not authorized'})
        return
    }
    
    const [_, token]= bearer.split(" ")
    if(!token){
        res.status(401).json({message: 'Not a valid token'})
        return
    }
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET as string)
        req.user = user
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({message: 'Not a valid token'})
        next()
    }
}
