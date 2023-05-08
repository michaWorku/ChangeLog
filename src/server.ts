import express, { NextFunction, Request, Response } from 'express'
import router from './router'
import morgan from 'morgan'
import cors from 'cors'
const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(express.static('static'))

app.get('/', (req:Request, res: Response)=>{
    res.status(200).json({message: 'hello'})
})

app.use('/api', router)

app.use((err: any, req: Request, res: Response, next: NextFunction)=>{
    if(err.type ==='auth'){
        res.status(401).json({message: 'unauthorized'})
    }else if(err.type === 'input'){
        res.status(400).json({message: 'invalid input'})
    }else{
        res.status(500).json({message: 'something went wrong'})
    }
})

export default app