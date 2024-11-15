const express = require('express')
const orderRouter = express.Router()
const  {placeOrderCOD, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus, verifyStripe, verifyRazorpay} = require('../Controllers/order.controller')
const adminAuth = require('../Middlewares/adminAuth.middleware')
const authUser = require('../Middlewares/auth')

orderRouter.post('/list', adminAuth ,allOrders)
orderRouter.post('/status', adminAuth ,updateStatus)

orderRouter.post('/place-COD', placeOrderCOD)
orderRouter.post('/place-stripe', placeOrderStripe)
orderRouter.post('/place-razorpay', placeOrderRazorpay)

orderRouter.get('/user-orders', userOrders)

orderRouter.post('/verify-stripe' ,verifyStripe)

orderRouter.post('/verify-razorpay', verifyRazorpay)

module.exports = orderRouter