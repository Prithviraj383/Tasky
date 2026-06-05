import express from 'express'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import { createBoard, getBoards } from '../controllers/boardController.js'

const router = express.Router({ mergeParams: true })

router.post("/", authMiddleware, createBoard)
router.get("/", authMiddleware, getBoards)

export default router