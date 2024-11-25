const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, 'User ID is required'],
    },
    items: {
        type: Array,
        required: [true, 'Items is required'],
    },
    amount: {
        type: Number,
        required: [true, 'Amount is required'],
        min: [0, 'Amount must be a positive number'],
    },
    address: {
            type: Object,
            required: [true, 'Address is required'],
    },
    status: {
        type: String,
        required: [true, 'Status is required'],
        default: 'Order Placed'
    },
    paymentMethod: {
        type: String,
        required: [true, 'Payment method is required'],
    },
    payment:{
        type: Boolean,
        required: [true, 'Payment is required'],
        default: false
    },
    date: {
        type: Number,
        required: [true, 'Date is required'],
    }
}, {
    timestamps: true,
    versionKey: false,
})

const orderModel = mongoose.model('Order', orderSchema)

module.exports = orderModel