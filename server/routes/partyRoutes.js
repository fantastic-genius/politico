import express from "express"
import partyMiddleware from "../middleware/partyMiddleware"
import partyController from "../controller/partyController"

const router = express.Router()
const partyVersionedAPi = "/api/v1/parties/"

router.post(partyVersionedAPi, partyMiddleware.createPartyMiddleware, partyController.createParty)
router.get(partyVersionedAPi, partyController.getAllParty)
router.get(`${partyVersionedAPi}:id`, partyController.getAParty)
router.patch(`${partyVersionedAPi}:id/name`, partyMiddleware.editPartyMiddleware, partyController.editAParty)
router.delete(`${partyVersionedAPi}:id`, partyMiddleware.deletePartyMiddleware, partyController.deleteParty)

export default router
