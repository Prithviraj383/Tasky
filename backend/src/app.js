import express from 'express'
import authRoutes from '../src/routes/authRoutes.js'
import workSpaceRoutes from './routes/workSpaceRoutes.js'
import cookieParser from 'cookie-parser'

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/workspaces", workSpaceRoutes)

export default app