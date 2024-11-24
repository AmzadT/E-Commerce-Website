const jwt = require('jsonwebtoken')

const authUser = async (req, res, next) => {
    try {
        const {token} = req.headers
        
        if (!token) {
            return res.status(401).json({ success: false, message: 'Not Authorized login again, token not found' })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.body.userId = decoded.id
        if (!decoded) {
            return res.status(401).json({ success: false, message: 'You are not authorized to access this route, Invalid token, please login again' })
        }
        next()
        
    } catch (error) {
        console.log(error)
        return res.status(401).json({ success: false, message: error.message })
    }
}

module.exports = authUser;
