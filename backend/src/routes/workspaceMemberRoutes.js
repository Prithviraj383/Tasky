import {inviteMember, getMembers} from '../controllers/workspaceMemberController.js'
import express from 'express'
import {authMiddleware} from '../middlewares/authMiddleware.js'

const router = express.Router({mergeParams: true})

router.post("/", authMiddleware, inviteMember)
router.get("/", authMiddleware, getMembers)
export default router