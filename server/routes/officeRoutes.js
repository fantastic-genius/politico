import express from "express"
import officeController from "../controller/officeController"
import officeMiddleware from "../middleware/officeMiddleware"

const officeVersionedApi = "/api/v1/offices/"
const router = express.Router()

router.post(officeVersionedApi, officeMiddleware.createOfficeMiddleware, officeController.createOffice)
router.get(officeVersionedApi, officeController.getAllOffice)
router.get(`${officeVersionedApi}:id`, officeController.getAnOffice)

export default router;
