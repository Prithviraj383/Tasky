import express from 'express'
import {authMiddleware} from '../middlewares/authMiddleware.js'
import {createTask} from '../controllers/taskController.js'

const router = express.Router({ mergeParams: true })

router.post("/", authMiddleware, createTask)

export default router