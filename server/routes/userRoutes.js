import express from 'express'
import userMiddleware from '../middleware/userMiddleware'
import userController from '../controller/userController'
import authMidlleware from '../middleware/authMiddleware'


const router = express.Router()

const userVersionedApi = "/api/v1/users/"

router.get(`${userVersionedApi}:email/email`, authMidlleware.verifyToken, userMiddleware.getUserByEmailMiddleware, userController.getUserByEmail)
export default router
