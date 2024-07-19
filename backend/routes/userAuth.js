const { request } = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.status(401).json({ message: "Authentication token is required" });
    }
    jwt.verify(token, process.env.JWTkey, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Token Expired. Please Sign in Again" });
        }
        req.user = user;
        next();
    })
}
module.exports = { authenticateToken };