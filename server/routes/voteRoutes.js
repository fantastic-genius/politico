import express from "express"
import voteMiddleware from "../middleware/voteMiddleware"
import voteController from "../controller/voteController"
import authMiddleware from "../middleware/authMiddleware"

const router = express.Router()
const voteVersionedAPi = "/api/v1/votes/"

router.post(voteVersionedAPi, authMiddleware.verifyToken, voteMiddleware.createVoteMiddleware, voteController.createVote)
router.get(`${voteVersionedAPi}:id/user`, authMiddleware.verifyToken, voteMiddleware.getUserVotesMiddleware, voteController.getUserVotes)

export default router
