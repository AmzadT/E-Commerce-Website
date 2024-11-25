const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price must be a positive number'],
    },
    image: {
        type: Array,
        required: [true, 'Image is required'],
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
    },
    subCategory: {
        type: String,
        required: [true, 'SubCategory is required'],
    },
    sizes: {
        type: Array,
        required: [true, 'Sizes is required'],
    },
    bestseller: {
        type: Boolean,
        default: false
    },
    date: {
        type: Number,
        required: [true, 'Date is required'],
    },
}, {
    timestamps: true,
    versionKey: false,
})

const productModel = mongoose.model('Product', productSchema)

module.exports = productModel