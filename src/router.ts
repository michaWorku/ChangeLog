import { Router, Response, Request, NextFunction } from "express";
import bcrpt from 'bcrypt'
import { createUser, signin } from "./handlers/users";
import { protect } from "./modules/auth";
import { body, oneOf, validationResult } from "express-validator"
import { handleInputErrors } from "./modules/middleware";
import { getProducts, createProduct, updateProduct, deleteProduct, getProduct } from "./handlers/products";
import { createUpdate, deleteUpdate, getUpdate, getUpdates, updateUpdate } from "./handlers/update";
const router = Router()

/**
 * User
 */
router.post('/users', createUser)
router.post('/signin', signin)

/**
 * Product
 */
router.use(protect)
router.get('/products', getProducts as any)
router.get('/products/:id', getProduct as any)
router.put('/products/:id', body('name').exists().optional(), handleInputErrors, updateProduct as any)
router.post(
    '/products',
    body('name').exists().isString(),
    handleInputErrors,
    createProduct as any
)
router.delete('/products/:id', deleteProduct as any)

/**
 * Update
 */
router.get('/updates', getUpdates as any)
router.get('/updates/:id', getUpdate)
router.put(
    '/updates/:id',
    body('title').optional(),
    body('body').optional(),
    body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']).optional(),
    handleInputErrors, 
    updateUpdate as any)
router.post(
    '/updates',
    body('title').exists().isString(),
    body('body').exists().isString(),
    body('version').isString().optional(),
    body('assets').isString().optional(),
    body('productId').exists().isString(),
    handleInputErrors, 
    createUpdate as any)
router.delete('/updates/:id', deleteUpdate as any)

/**
 * Update Point
 */
router.get('/updatepoints', (req: Request, res: Response) => {

})
router.get('/updatepoints/:id', (req: Request, res: Response) => {

})
router.put(
    '/updatepoints/:id',
    body('name').isString().optional(),
    body('description').isString().optional(),
    handleInputErrors,
    (req: Request, res: Response) => {

    })
router.post(
    '/updatepoints',
    body('name').exists().isString(),
    body('descriptioin').exists().isString(),
    body('updateId').exists().isString(),
    handleInputErrors,
    (req: Request, res: Response) => {

    })
router.delete('/updatepoints/:id', (req: Request, res: Response) => {

})

// Error handler
router.use((err:any, req: Request, res: Response, next: NextFunction) => {
    console.log({err})
    res.status(400).json({message: err.message})
})
export default router