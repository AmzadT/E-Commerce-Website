const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    cartData: {
        type: Object,
        default: {}
    },
 }, {
    minimize: false,
    timestamps: true, 
    versionKey: false
})

const userModel = mongoose.model('User', userSchema)

module.exports = userModel