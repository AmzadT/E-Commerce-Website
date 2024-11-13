require('dotenv').config()
const mongoose = require('mongoose')

const Connection = mongoose.connect(process.env.MONGO_URL)

module.exports = Connection;