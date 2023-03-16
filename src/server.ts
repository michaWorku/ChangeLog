import express, { NextFunction, Request, Response } from 'express'
import router from './router'
import morgan from 'morgan'
import cors from 'cors'
import { protect } from './modules/auth'
const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(express.static('static'))

app.get('/', (req:Request, res: Response)=>{
    res.status(200).json({message: 'hello'})
})

app.use('/api', protect, router)

export default app