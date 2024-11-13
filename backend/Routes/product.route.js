const express = require('express')
const {AddProduct, ListProducts, RemoveProduct, SingleProduct, UpdateProduct} = require('../Controllers/product.controller')
const upload = require('../Middlewares/multer.middleware')
const adminAuth = require('../Middlewares/adminAuth.middleware')
const productRouter = express.Router()

productRouter.post('/add',adminAuth, upload.fields([{name: 'image1', maxCount: 1}, {name: 'image2', maxCount: 1}, {name: 'image3', maxCount: 1}, {name: 'image4', maxCount: 1}]),AddProduct)

productRouter.get('/list', ListProducts)

productRouter.delete('/remove/:id',adminAuth, RemoveProduct)

productRouter.get('/single/:id', SingleProduct)

productRouter.patch('/update/:id',adminAuth, UpdateProduct)

module.exports = productRouter