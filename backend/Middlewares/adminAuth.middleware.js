const jwt = require('jsonwebtoken')

const adminAuth = async (req, res, next) => {
    try {
        const {token} = req.headers
        if (!token) {
            return res.status(401).json({ success: false, message: 'No token provided, token not found' })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        if (decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.status(401).json({ success: false, message: 'You are not authorized to access this route, Invalid token, please login again' })
        }
        next()
        
    } catch (error) {
        console.log(error)
        return res.status(401).json({ success: false, message: error.message })
    }
}

module.exports = adminAuth;