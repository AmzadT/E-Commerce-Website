const express = require('express')
const cartRouter = express.Router()
const {addToCart, updateCart, getUserCart} = require('../Controllers/cart.controller')
const authUser = require('../Middlewares/auth')


cartRouter.get('/get', getUserCart)

cartRouter.post('/add', addToCart)

cartRouter.patch('/update', updateCart)


module.exports = cartRouter