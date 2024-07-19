const router = require('express').Router();
const User = require('../models/user');
const { authenticateToken } = require('./userAuth');


// add boot to favorites
router.put('/addbooktofav', authenticateToken, async (req, res) => {
    try {
        const { id, bookid } = req.headers;
        const user = await User.findById(id);

        if (!user.favourites.includes(bookid)) {
            user.favourites.push(bookid);
            await user.save();
            return res.status(200).json({ message: "Book added to favourites successfully" });
        } else {
            return res.status(200).json({ message: "Book already exists in favourites" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
})

// remove book from favorites
router.put('/removebookfromfav', authenticateToken, async (req, res) => {
    try {
        const { id, bookid } = req.headers;
        const user = await User.findById(id);

        if (!user.favourites.includes(bookid)) {
            return res.status(200).json({ message: "No Such book exist in favourites" });
        } else {
            await User.findByIdAndUpdate(id, { $pull: { favourites: bookid } });
            return res.status(200).json({ message: "Book successfully removed from favourites" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
})



// get all books from user's favourites
router.get('/getfavbooks', authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const user = await User.findById(id).populate('favourites');
        if (user.favourites.length === 0) {
            return res.status(200).json({ message: "No favourites found" });
        }
        return res.status(200).json({
            status: "Success",
            data: user.favourites
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
})


module.exports = router;