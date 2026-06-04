import db from '../config/db.js'
import asyncHandler from '../utils/asyncHandler.js'

const createWorkSpace = asyncHandler(async (req, res) => {

    const {name} = req.body

    if(!name){
        return res.status(400).json({message: "Please provide a name for the workspace"})
    }

    const workspace = {
        name,
        owner_id: req.user.id
    }
    const result = await db.query("INSERT INTO workspaces (name, owner_id) VALUES ($1, $2) RETURNING *", [workspace.name, workspace.owner_id])
    const createdWorkspace = result.rows[0]

    await db.query("INSERT INTO workspace_members (workspace_id, user_id, role) VALUES ($1, $2, $3)", [createdWorkspace.id, req.user.id, "owner"])

    return res.status(201).json({message: "Workspace created successfully", workspace: createdWorkspace})
})

const getMyWorkSpaces = asyncHandler(async (req, res) => {
    const id = req.user.id

    const result = await db.query("SELECT w.name FROM workspaces AS w WHERE w.owner_id = $1 ORDER BY w.created_at DESC", [id])
    return res.status(200).json({workspaces: result.rows})
})

export {createWorkSpace, getMyWorkSpaces}