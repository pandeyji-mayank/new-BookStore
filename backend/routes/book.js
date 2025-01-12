const router = require('express').Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const Book = require('../models/book');
const { authenticateToken } = require('./userAuth');


// add book-admin
router.post('/addbook', authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const user = await User.findById(id);
        if (user.role !== 'admin') {
            return res.status(403).json({ message: "You are not authorized to perform this action" });
        }

        const book = new Book({
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language
        });
        console.log(book);
        await book.save();
        res.status(201).json({ message: "book added successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})


router.put('/updatebook', authenticateToken, async (req, res) => {
    try {
        const { bookid } = req.headers;
        console.log(bookid);
        await Book.findByIdAndUpdate(bookid, {
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language
        });
        return res.status(200).json({ message: "book updated successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
})


router.put('/deletebook', async (req, res) => {
    try {
        const { bookid } = req.headers;
        await Book.findByIdAndDelete(bookid);
        return res.status(200).json({ message: "book deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
})


router.get('/getallbooks', async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 });
        return res.status(200).json(books);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server Eroor" });
    }
})

router.get('/getrecentbooks', async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 }).limit(4);
        return res.status(200).json(books);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server Eroor" });
    }
})

router.get('/getbookbyid/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        return res.status(200).json({
            status: "Success",
            data: book
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server Eroor" });
    }
})


module.exports = router;