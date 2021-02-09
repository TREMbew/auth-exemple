const jwt = require('jsonwebtoken');
require('dotenv').config()
const authMiddleware = (req, res, next) => {
    let token = req.header('auth-token');
    if(!token) {
        return res.status(401).json({errors : [{msg : 'Not auth'}]})
    }
    jwt.verify(token, process.env.SECRET_KEY, (err,payload) => {
        if(err) console.log(err)
        req.userId = payload.userId;
        next()
    })
}

module.exports = authMiddleware;