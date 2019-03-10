import express from 'express'
import userMiddleware from '../middleware/userMiddleware'
import userController from '../controller/userController'
import authMidlleware from '../middleware/authMiddleware'
import imageUploadMiddleware from '../middleware/imageUploadMiddleware'
import multer from 'multer'
import {storage} from '../config'

const router = express.Router()

const userVersionedApi = "/api/v1/users/"

router.get(`${userVersionedApi}:email/email`, authMidlleware.verifyToken, userMiddleware.getUserByEmailMiddleware, userController.getUserByEmail)
router.get(`${userVersionedApi}:id`, authMidlleware.verifyToken, userMiddleware.getUserByIdMiddleware, userController.getUserById)
router.patch(`${userVersionedApi}:id`, authMidlleware.verifyToken, userMiddleware.editUserMiddleware, userController.editUser)
router.patch(`${userVersionedApi}:id/passport`, authMidlleware.verifyToken, multer({storage: storage}).single('profile-pics'), imageUploadMiddleware.uploadImage, userMiddleware.editPassportUrlMiddleware, userController.editUserPassport)


export default router
