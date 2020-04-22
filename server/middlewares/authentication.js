require('dotenv').config()
const jwt = require('jsonwebtoken')

const authentication = (req, res, next) => {
    try {
        const token = req.headers.token
        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.UserId = decoded.UserId
            next()
        } else {
            res.status(404),json({
                status: 404,
                message: 'Token Not Found'
            })
        }
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: 'Invalid Token'
        })
    }
}

module.exports = authentication