require('dotenv').config()
const express = require('express')
const Connection = require('./Config/db')
const app = express()
const PORT = process.env.PORT || 3002
const cors = require('cors')
const ConnectCloudinary = require('./Config/cloudinary')
const userRouter = require('./Routes/user.route')
const productRouter = require('./Routes/product.route')
const cartRouter = require('./Routes/cart.route')
const orderRouter = require('./Routes/order.route')

app.use(express.json())
ConnectCloudinary()
app.use(cors())

app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/orders', orderRouter)

app.get('/', (req, res)=>{
    res.send('Server is Running Fine')
})

app.use((req, res) => {
   res.status(404).send(`404 Page Not Found`)
})

// app.use((err, req, res, next) => {
//     if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
//         return res.status(400).json({ success: false, message: 'Invalid JSON format in request body' });
//     }
//     next();
// });

app.listen(PORT, async ()=>{
   try {
    await Connection;
   console.log(`srever is running on Port : ${PORT} and connected to the database`)
   } catch (error) {
      console.log(`error coming while connected to the database : ${error} ${error.message}`)
   }
})

