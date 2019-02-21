import express from "express"
import petitionMiddleware from "../middleware/petitionMiddleware"
import petitionController from "../controller/petitionController"
import authMiddleware from "../middleware/authMiddleware"

const router = express.Router()
const petitionVersionedAPi = "/api/v1/petitions/"

router.post(petitionVersionedAPi,authMiddleware.verifyToken, petitionMiddleware.createPetitionMiddleware, petitionController.createPetition)

export default router
