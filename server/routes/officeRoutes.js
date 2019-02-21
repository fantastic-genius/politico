import express from "express"
import officeController from "../controller/officeController"
import officeMiddleware from "../middleware/officeMiddleware"
import authMiddleware from "../middleware/authMiddleware"

const officeVersionedApi = "/api/v1/offices/"
const router = express.Router()

router.post(officeVersionedApi, authMiddleware.verifyToken, officeMiddleware.createOfficeMiddleware, officeController.createOffice)
router.get(officeVersionedApi, authMiddleware.verifyToken, officeController.getAllOffice)
router.get(`${officeVersionedApi}:id`, authMiddleware.verifyToken, officeController.getAnOffice)
router.post(`${officeVersionedApi}:id/register`, authMiddleware.verifyToken, officeMiddleware.createCandidateMiddleware, officeController.createCandidate)
router.get(`${officeVersionedApi}:id/result`, authMiddleware.verifyToken, officeMiddleware.getOfficeVotesMiddleware, officeController.getOfficeVotes)

export default router;
