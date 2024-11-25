const orderModel = require("../Models/order.model")
const userModel = require("../Models/user.model")
const Stripe = require('stripe')
const razorpay = require('razorpay')

const currency = 'inr'
const delivery_fee = 10

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET_KEY
})



const placeOrderCOD = async (req, res) => {

    try {
        const { userId, amount, items, address } = req.body

        if (!userId || !amount || !items || !address) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: 'Cash on Delivery',
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()
        await userModel.findByIdAndUpdate(userId, { cartData: {} }, {new: true})
        res.status(201).json({ success: true, message: 'Order placed successfully' })

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error.message })
    }
}



const placeOrderStripe = async (req, res) => {
    try {
        const { userId, amount, items, address } = req.body
        const { origin } = req.headers

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: 'Stripe',
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }));


        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: 'Delivery Fee'
                },
                unit_amount: delivery_fee * 100
            },
            quantity: 1
        })

        const session = stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment',
        })

        res.status(200).json({ success: true, session_url: session.url })
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: error.message })
    }
}


const verifyStripe = async (req, res) => {
    const { orderId, success, userId } = req.body

    try {
        if (success === 'true') {
            await orderModel.findByIdAndUpdate(orderId, { payment: true })
            await userModel.findByIdAndUpdate(userId, { cartData: {} })
            res.status(200).json({ success: true, message: 'Payment successful' })
        } else {
            await orderModel.findByIdAndDelete(orderId)
            res.status(200).json({ success: true, message: 'Payment failed' })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: error.message })
    }
}


const placeOrderRazorpay = async (req, res) => {
    try {
        const { userId, amount, items, address } = req.body

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: 'Razorpay',
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const options = {
            amount: amount * 100,
            currency: currency.toUpperCase(),
            receipt: newOrder._id.toString(),
        }

        await razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                console.error(error);
                res.status(500).json({ success: false, message: error.message })
            } else {
                res.status(200).json({ success: true, order })
            }
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: error.message })
    }
}


const verifyRazorpay = async (req, res) => {
    try {
        const { userId, razorpay_order_id } = req.body

        const { razorpay_payment_id, razorpay_signature } = req.headers  // comment

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)

        if (orderInfo.status === 'paid') {
            await orderModel.findByIdAndUpdate(orderInfo.receipt, { payment: true })
            await userModel.findByIdAndUpdate(userId, { cartData: {} })
            res.status(200).json({ success: true, message: 'Payment successful' })
        } else {

            await orderModel.findByIdAndDelete(orderInfo.receipt)  // comment

            res.status(200).json({ success: false, message: 'Payment failed' })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: error.message })
    }
}


const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.status(200).json({ success: true, orders })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error.message })
    }
}


const userOrders = async (req, res) => {
    try {
        const { userId } = req.body
        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        const orders = await orderModel.find({ userId })
        res.status(200).json({ success: true, orders })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error.message })
    }
}


const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body
        await orderModel.findByIdAndUpdate(orderId, { status }, { new: true })
        res.status(200).json({ success: true, message: 'Order status updated successfully' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error.message })
    }
}

module.exports = { placeOrderCOD, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus, verifyStripe, verifyRazorpay }