const express = require('express')
const {UserLogin, UserRegister, AdminLogin} = require('../Controllers/user.controller')
const userRouter = express.Router()

userRouter.post('/register', UserRegister)

userRouter.post('/login', UserLogin)

userRouter.post('/admin', AdminLogin)

module.exports = userRouter