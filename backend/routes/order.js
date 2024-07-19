const router = require('express').Router();
const User = require('../models/user');
const Book = require('../models/book');
const Order = require('../models/order');
const { authenticateToken } = require('./userAuth');
const { route } = require('./order');

//place order 
router.post('/placeorder', authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const { order } = req.body;
        for (const orderdata of order) {
            const newOrder = new Order({ user: id, book: orderdata._id })
            const orderDatafromDB = newOrder.save();
            await User.findByIdAndUpdate(id, {
                $push: { orders: orderDatafromDB._id }
            }); {

            }
            await User.findByIdAndUpdate(id, {
                $pull: { cart: orderdata._id }
            });
        }
        return res.status(200).json({ status: "Success", message: "Order placed successfully" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
})

router.get('/getorderhistory', authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate({
            path: 'orders',
            populate: { path: 'book' },
        });
        const ordersData = userData.orders.reverse();
        return res.json({ status: "Success", data: ordersData });

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
})
router.get('/getallorders', authenticateToken, async (req, res) => {
    try {
        const userData = await Order.find()
            .populate({
                path: 'book'
            })
            .populate({
                path: 'user'
            })
            .sort({
                createdAt: -1
            });
        return res.json({ status: "Success", data: userData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
})

router.put('/updatestatus/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        //need to implement to check if the role is admin or not
        await Order.findByIdAndUpdate(id, { status: req.body.status });
        return res.json({
            status: "Success",
            message: "Status updated successfully",
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
})


module.exports = router;