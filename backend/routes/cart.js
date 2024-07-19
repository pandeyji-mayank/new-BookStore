const router = require('express').Router();
const User = require('../models/user');
const { authenticateToken } = require('./userAuth');

// add to cart
router.put('/addbooktocart', authenticateToken, async (req, res) => {
    try {
        const { id, bookid } = req.headers;
        const user = await User.findById(id);

        if (!user.cart.includes(bookid)) {
            user.cart.push(bookid);
            await user.save();
            return res.status(200).json({ message: "Book added to Cart successfully" });
        } else {
            return res.status(200).json({ message: "Book already exists in Cart" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
})



// remove book from cart
router.put('/removebookfromcart', authenticateToken, async (req, res) => {
    try {
        const { id, bookid } = req.headers;
        const user = await User.findById(id);

        if (!user.cart.includes(bookid)) {
            return res.status(200).json({ message: "No Such book exist in Cart" });
        } else {
            await User.findByIdAndUpdate(id, { $pull: { cart: bookid } });
            return res.status(200).json({ message: "Book successfully removed from Cart" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
})



// get all books from user's cart
router.get('/getcartbooks', authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const user = await User.findById(id).populate('cart');
        if (user.cart.length === 0) {
            return res.status(200).json({ message: "No Books in Cart" });
        }
        return res.status(200).json({
            status: "Success",
            data: user.cart.reverse()
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
})



module.exports = router;