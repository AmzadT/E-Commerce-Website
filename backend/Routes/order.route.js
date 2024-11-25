const express = require('express')
const orderRouter = express.Router()
const  {placeOrderCOD, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus, verifyStripe, verifyRazorpay} = require('../Controllers/order.controller')
const adminAuth = require('../Middlewares/adminAuth.middleware')
const authUser = require('../Middlewares/auth')

orderRouter.post('/list', adminAuth ,allOrders)
orderRouter.post('/status', adminAuth ,updateStatus)

orderRouter.post('/place-COD',authUser, placeOrderCOD)
orderRouter.post('/place-stripe',authUser, placeOrderStripe)
orderRouter.post('/place-razorpay',authUser, placeOrderRazorpay)

orderRouter.post('/user-orders',authUser, userOrders)

orderRouter.post('/verify-stripe' ,authUser,verifyStripe)

orderRouter.post('/verify-razorpay',authUser, verifyRazorpay)

module.exports = orderRouter