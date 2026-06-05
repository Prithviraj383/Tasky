import express from 'express'
import authRoutes from '../src/routes/authRoutes.js'
import workSpaceRoutes from './routes/workSpaceRoutes.js'
import boardRoutes from './routes/boardRoutes.js'
import taskRoutes from './routes/taskRoutes.js'
import cookieParser from 'cookie-parser'

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/workspaces", workSpaceRoutes)
app.use("/workspaces/:workspaceId/boards",  boardRoutes)
app.use("/boards/:boardId/tasks", taskRoutes)

export default app