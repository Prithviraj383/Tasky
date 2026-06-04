import db from '../config/db.js'
import asyncHandler from '../utils/asyncHandler.js'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'

const register = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body
    //validation
    if(!name || !email || !password) {
        return res.status(400).json({message: 'Please provide all fields'})
    }

    //check if user exists already
    const check = await db.query('SELECT * FROM users WHERE email = $1 OR password = $2', [email, password])
    if(check.rows.length > 0){
        return res.status(400).json({message: "User already exists"})
    }

    //hashing the password
    const hash = crypto.createHash('sha256').update(password).digest('hex')
    const result = await db.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *", [name, email, hash])
    const user = result.rows[0]

    //creating token for the registered user
    const token = jwt.sign({
        id: user.id
    }, process.env.JWT_SECRET,)

    //adding token into the cookie
    res.cookie("token", token)

    return res.status(201).json({
        message: "User created successfully",
        user:{
            name: name,
            email: email
        }
    })
})

const login = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body

    if(!email || !password) {
        return res.status(400).json({message: 'Please provide all fields'})
    }

    const hash = crypto.createHash('sha256').update(password).digest('hex')

    const check = await db.query("SELECT * FROM users WHERE email = $1 AND password = $2", [email, hash])
    if(check.rows.length == 0){
        return res.status(400).json({message: "Invalid credentials"})
    }

    const user = check.rows[0]
    const token = jwt.sign({
        id: user.id
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    return res.status(200).json({
        message: "Login successful",
        user: {
            name: user.name,
            email: user.email
        }
    })
})

const logout = asyncHandler(async (req, res) => {
    res.clearCookie("token")
    return res.status(200).json({message: "Logout successful"})
})

export {register, login, logout}