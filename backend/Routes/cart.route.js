const express = require('express')
const cartRouter = express.Router()
const {addToCart, updateCart, getUserCart} = require('../Controllers/cart.controller')
const authUser = require('../Middlewares/auth')


cartRouter.post('/get',authUser, getUserCart)

cartRouter.post('/add',authUser, addToCart)

cartRouter.post('/update',authUser, updateCart)

module.exports = cartRouter