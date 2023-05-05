import { Router, Response, Request } from "express";
import bcrpt from 'bcrypt'
import { createUser, signin } from "./handlers/users";
import { protect } from "./modules/auth";
import { body, oneOf, validationResult } from "express-validator"
import { handleInputErrors } from "./modules/middleware";
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
router.get('/products', (req: Request, res: Response) => {
    res.json({ message: 'hey' }).status(200)
})
router.get('/products/:id', (req: any, res: Response) => {
    res.json({ id: req.params.id, testt: req?.test }).status(200)
})
router.put('/products/:id', body('name').exists().optional(), handleInputErrors, (req: Request, res: Response) => {

})
router.post('/products', (req: Request, res: Response) => {

})
router.delete('/products/:id', (req: Request, res: Response) => {

})

/**
 * Update
 */
router.get('/updates', (req: Request, res: Response) => {

})
router.get('/updates/:id', (req: Request, res: Response) => {

})
router.put(
    '/updates/:id',
    body('name').optional(),
    body('body').optional(),
    body('status').isIn([body('IN_PROGRESS'), body('SHIPPED'), body('DEPRECATED')]),
    handleInputErrors,
    (req: Request, res: Response) => {

    })
router.post(
    '/updates',
    body('name').exists().isString(),
    body('body').exists().isString(),
    body('productId').exists().isString(),
    handleInputErrors,
    (req: Request, res: Response) => {

    })
router.delete('/updates/:id', (req: Request, res: Response) => {

})

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

export default router