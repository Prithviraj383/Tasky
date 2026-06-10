import db from "../config/db.js";
import asyncHandler from "../utils/asyncHandler.js";

const inviteMember = asyncHandler(async (req, res) => {
  const { workspaceId } = req.params;
  const { email } = req.body;
  const userId = req.user.id;
  //workspace check
  const wCheck = await db.query("SELECT * FROM workspaces WHERE id = $1", [
    workspaceId,
  ]);
  if (wCheck.rows.length == 0) {
    return res.status(400).json({ message: "WorkSpace doesnt exist" });
  }

  //check if logged in user is the owner of the workspace
  if (wCheck.rows[0].owner_id != userId) {
    return res
      .status(403)
      .json({ message: "You arent the owner of the workspace" });
  }

  //check if user exists
  const userCheck = await db.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  if (userCheck.rows.length == 0) {
    return res.status(400).json({ message: "User doesnt exist" });
  }

  const memberUserId = userCheck.rows[0].id;

  //check if the member already exist
  const check = await db.query(
    "SELECT * FROM workspace_members WHERE workspace_id = $1 AND user_id = $2",
    [workspaceId, memberUserId],
  );
  if (check.rows.length > 0) {
    return res
      .status(400)
      .json({ message: "User already exists in the workspace" });
  }

  const result = await db.query(
    "INSERT INTO workspace_members (workspace_id, user_id, role) VALUES ($1, $2, $3) RETURNING *",
    [workspaceId, memberUserId, "member"],
  );
  const member = result.rows[0];

  return res.status(201).json({
    message: "Member added successfully",
    member,
  });
});

const getMembers = asyncHandler(async (req, res) => {
  const workspaceId = req.params.workspaceId;

  //workspace check
  const wCheck = await db.query("SELECT * FROM workspaces WHERE id = $1", [
    workspaceId,
  ]);
  if (wCheck.rows.length == 0) {
    return res.status(400).json({ message: "WorkSpace doesnt exist" });
  }

  //fetch all members of the workspace
  const result = await db.query(
    "SELECT u.name, u.email, wm.role FROM workspace_members AS wm JOIN users AS u ON wm.user_id = u.id WHERE wm.workspace_id = $1",
    [workspaceId],
  );
  return res.status(200).json({
    message: "Members retrieved successfully",
    members: result.rows,
  });
});

const removeMember = asyncHandler(async (req, res) => {
  const { workspaceId } = req.params;
  const { email } = req.body;
  const userId = req.user.id;

  //workspace check
  const wCheck = await db.query("SELECT * FROM workspaces WHERE id = $1", [
    workspaceId,
  ]);
  if (wCheck.rows.length == 0) {
    return res.status(400).json({ message: "WorkSpace doesnt exist" });
  }

  //check if logged in user is the owner of the workspace
  if (wCheck.rows[0].owner_id != userId) {
    return res
      .status(403)
      .json({ message: "You arent the owner of the workspace" });
  }

  //check if user exists
  const userCheck = await db.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  if (userCheck.rows.length == 0) {
    return res.status(400).json({ message: "User doesnt exist" });
  }

  const memberUserId = userCheck.rows[0].id;

  //check if the member already exist
  const check = await db.query(
    "SELECT * FROM workspace_members WHERE workspace_id = $1 AND user_id = $2",
    [workspaceId, memberUserId],
  );
  if (check.rows.length == 0) {
    return res.status(400).json({ message: "User is not a member of the workspace" });
  }

  //remove the member
  await db.query("DELETE FROM workspace_members WHERE workspace_id = $1 AND user_id = $2", [
    workspaceId,
    memberUserId,
  ]);

  return res.status(200).json({ message: "Member removed successfully" });
});

export { inviteMember, getMembers, removeMember };
