import express from "express"
import authController from "../controller/authController"
import authMiddleware from "../middleware/authMiddleware"

const authVersionedApi = "/api/v1/auth/"
const router = express.Router()

router.post(`${authVersionedApi}signup`, authMiddleware.signupMiddleware, authController.signup)
router.post(`${authVersionedApi}login`, authMiddleware.loginMiddleware, authController.login)
router.post(`${authVersionedApi}reset`, authMiddleware.resetMiddleware, authController.reset)
router.patch(`${authVersionedApi}reset/password`, authMiddleware.passwordResetMiddleware, authController.passwordReset)
router.patch(`${authVersionedApi}:id/password`, authMiddleware.verifyToken, authMiddleware.passwordChangeMiddleware, authController.passwordReset)

export default router
