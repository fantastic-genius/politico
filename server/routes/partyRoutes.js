import express from "express"
import partyMiddleware from "../middleware/partyMiddleware"
import partyController from "../controller/partyController"
import authMiddleware from "../middleware/authMiddleware"

const router = express.Router()
const partyVersionedAPi = "/api/v1/parties/"

router.post(partyVersionedAPi, authMiddleware.verifyToken, partyMiddleware.createPartyMiddleware, partyController.createParty)
router.get(partyVersionedAPi, authMiddleware.verifyToken, partyController.getAllParty)
router.get(`${partyVersionedAPi}:id`, authMiddleware.verifyToken, partyController.getAParty)
router.patch(`${partyVersionedAPi}:id/name`, authMiddleware.verifyToken, partyMiddleware.editPartyMiddleware, partyController.editAParty)
router.delete(`${partyVersionedAPi}:id`, authMiddleware.verifyToken, partyMiddleware.deletePartyMiddleware, partyController.deleteParty)

export default router
