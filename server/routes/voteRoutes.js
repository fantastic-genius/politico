import express from "express"
import voteMiddleware from "../middleware/voteMiddleware"
import voteController from "../controller/voteController"
import authMiddleware from "../middleware/authMiddleware"

const router = express.Router()
const voteVersionedAPi = "/api/v1/votes/"

router.post(voteVersionedAPi,authMiddleware.verifyToken, voteMiddleware.createVoteMiddleware, voteController.createVote)

export default router
