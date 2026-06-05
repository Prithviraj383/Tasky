import db from '../config/db.js'
import asyncHandler from '../utils/asyncHandler.js'

const createTask = asyncHandler(async (req, res) => {
    const { boardId } = req.params
    const { title, description } = req.body
    const userId = req.user.id

    const check = await db.query("SELECT * FROM boards WHERE id = $1 AND created_by = $2", [boardId, userId])
    if (check.rows.length === 0) {
        return res.status(403).json({ message: "You are not a member of this board" })
    }

    const check2 = await db.query("SELECT * FROM tasks WHERE title = $1 AND board_id = $2", [title, boardId])
    if (check2.rows.length > 0) {
        return res.status(400).json({ message: "Task with this title already exists in the board" })
    }

    const result = await db.query("INSERT INTO tasks (title, description, board_id, created_by) VALUES ($1, $2, $3, $4)", [title, description, boardId, userId])
    res.status(201).json({message: "Task created successfully", task: result.rows[0]})
})

const getTasks = asyncHandler(async (req, res) => {
    const { boardId } = req.params

    const userId = req.user.id
    console.log(boardId, userId)
    const check = await db.query("SELECT * FROM boards WHERE id = $1 AND created_by = $2", [boardId, userId])
    if (check.rows.length === 0) {
        return res.status(403).json({ message: "You are not a member of this board" })
    }

    const check2 = await db.query("SELECT * FROM tasks WHERE board_id = $1", [boardId])
    if (check2.rows.length === 0) {
        return res.status(404).json({ message: "No tasks found for this board" })
    }

    const result = await db.query("SELECT * FROM tasks WHERE board_id = $1", [boardId])
    res.status(200).json({ tasks: result.rows })
})

export {createTask, getTasks}