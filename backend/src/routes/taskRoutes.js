import express from 'express'
import {authMiddleware} from '../middlewares/authMiddleware.js'
import {createTask, getTasks} from '../controllers/taskController.js'

const router = express.Router({ mergeParams: true })

router.post("/", authMiddleware, createTask)
router.get("/", authMiddleware, getTasks)

export default router