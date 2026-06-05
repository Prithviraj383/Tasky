import express from 'express'
import { createWorkSpace, getMyWorkSpaces } from '../controllers/workSpaceController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post("/", authMiddleware, createWorkSpace)
router.get("/my-workspaces", authMiddleware, getMyWorkSpaces)

export default router