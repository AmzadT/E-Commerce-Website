const cloudinary = require('cloudinary')

const ConnectCloudinary = async ()=>{
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_SECRET_KEY
        })
    } catch (error) {
        console.log('Error connecting to cloudinary:', error)
    }
}

module.exports = ConnectCloudinary;