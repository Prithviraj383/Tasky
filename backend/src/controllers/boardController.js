import db from '../config/db.js'
import asyncHandler from '../utils/asyncHandler.js'

const createBoard = asyncHandler(async (req, res) => {
    const {name} = req.body
    const {workspaceId} = req.params
    const userId = req.user.id
    const check = await db.query("SELECT * FROM boards WHERE name = $1 AND workspace_id = $2", [name, workspaceId])

    if (check.rows.length > 0) {
        return res.status(400).json({ message: "Board with this name already exists in the workspace" })
    }

    const check2 = await db.query("SELECT * FROM workspace_members WHERE user_id = $1 AND workspace_id = $2", [userId, workspaceId])

    if (check2.rows.length === 0) {
        return res.status(403).json({ message: "You are not a member of this workspace" })
    }

    const board = await db.query("INSERT INTO boards (name, workspace_id, created_by) VALUES ($1, $2, $3) RETURNING *", [name, workspaceId, userId])

    res.status(201).json({message: "Board created successfully", board: board.rows[0]})
})

const getBoards = asyncHandler(async (req, res) => {
    const {workspaceId} = req.params
    const userId = req.user.id

    const result = await db.query("SELECT * FROM boards WHERE workspace_id = $1 AND created_by = $2", [workspaceId, userId])
    res.status(200).json({ boards: result.rows })
})

export { createBoard, getBoards }