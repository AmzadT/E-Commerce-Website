// Add To Cart

const userModel = require("../Models/user.model");

const addToCart = async (req, res) => {
    try {
        const { userId, itemId, size } = req.body;
        const userData = await userModel.findById(userId)
        var cartData = await userData.cartData
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1
            } else {
                cartData[itemId][size] = 1
            }
        } else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }

        await userModel.findByIdAndUpdate(userId, { cartData })
        res.json({ success: true, message: 'Item added to cart successfully' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}





// Update Cart
const updateCart = async (req, res) => {
    try {
        const { userId, itemId, size, quantity } = req.body;

        const userData = await userModel.findById(userId)
        var cartData = await userData.cartData
        cartData[itemId][size] = quantity

        await userModel.findByIdAndUpdate(userId, { cartData })
        res.json({ success: true, message: ' Cart updated successfully' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


// Get Users Cart
const getUserCart = async (req, res) => {
    try {
        const {userId} = req.body
        const userData = await userModel.findById(userId)
        var cartData = await userData.cartData
        res.json({ success: true, cartData })
        
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


module.exports = { addToCart, updateCart, getUserCart }