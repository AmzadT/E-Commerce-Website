const bcrypt = require('bcrypt')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const userModel = require("../Models/user.model")



const UserRegister = async (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).json({ success: false, message: "Please provide all fields" })
    }

    try {
        const { name, email, password } = req.body;
        const userExist = await userModel.findOne({ email })

        if (userExist) {
            return res.status(400).json({ success: false, message: "User already exist" })
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Invalid email please provide a valid email address" })
        }

        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Password must be at least 8 characters long please enter a strong password" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })
        const user = await newUser.save()
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY)
        res.status(201).json({ success: true, message: `${user.name} : registered successfully`, token: token })

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Server Error, error coming while registering", error: error.message })
    }
}


const UserLogin = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ success: false, message: "Please provide email and password" })
    }

    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found or exist, please register first" })
        }

        const matchPassword = await bcrypt.compare(password, user.password)

        if (!matchPassword) {
            return res.status(400).json({ success: false, message: "Incorrect password" })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY)
        res.status(200).json({ success: true, message: `${user.name} : logged in successfully`, token: token })

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Server Error, error coming while logging in", error: error.message })
    }
}


const AdminLogin = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ success: false, message: "Please provide email and password" })
    }

    try {
        const { email, password } = req.body
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET_KEY)
            res.status(200).json({ success: true, token })
        }else {
            return res.status(400).json({ success: false, message: "Incorrect email or password" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error.message })
    }
}

module.exports = { UserLogin, UserRegister, AdminLogin }

