const jwt = require('jsonwebtoken')
const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(' ')[1]; // trả ra token của request
    if (!token) {
        return res.status(401).json({
            success: false,
            message : 'Access token not found'
        })
    }else{
        try {
            const decoded = jwt.verify(token, process.env.access_Token); // hàm này verify posted token compared to user's token
            console.log(decoded);
            req.userId = decoded.userId;
            next();
        } catch (error) {
            const decoded = jwt.verify(token, process.env.access_Token); // hàm này verify posted token compared to user's token
            console.log(decoded);
            console.log(req.headers)
            res.status(403).json({
            success: false,
            message: 'Invalid Token',
        })
        }
    }
} 
module.exports = verifyToken;