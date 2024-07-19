const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { authenticateToken } = require('./userAuth');
require('dotenv').config();
// signup
router.post('/signup', async (req, res) => {
    try {
        const { username, email, password, address } = req.body;
        // check username length is more than 3 characters
        if (username.length < 4) {
            return res.status(400).json({ message: "Username should be at least 4 characters long" });
        }

        // check username already exists
        const existingUsername = await User.find({ username: username });
        if (existingUsername.length > 0) {
            return res.status(400).json({ message: "Username already exists" });
        }

        //check email already exists
        const existingEmail = await User.find({ email: email });
        if (existingEmail.length > 0) {
            return res.status(400).json({ message: "Email already exists" });
        }
        // password length check
        if (password.length < 6) {
            return res.status(400).json({ message: "Password should be at least 6 characters long" });
        }

        // check email is in valid format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashPassword, address });
        await newUser.save();
        return res.status(200).json({ message: "User created successfully", token: newUser._id });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }
})


// signin
router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        // check email already exists
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // check password is correct
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const authClaims = [
            { name: user.username },
            { role: user.role },
        ]
        const token = jwt.sign({ authClaims }, process.env.JWTkey, { expiresIn: '3d' })
        return res.status(200).json({ id: user._id, role: user.role, token: token });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});


//get user information
router.get('/getuserinfo', authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const data = await User.findById(id).select('-password');
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
})

// update address
router.put('/updateaddress', authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const { address } = req.body;
        await User.findByIdAndUpdate(id, { address: address })
        return res.status(200).json({ message: "Address updated successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
})


module.exports = router;