const express = require('express');
const app = express();
const cors = require('cors');
require("dotenv").config();
require('./conn/conn')
console.log(process.env.PORT);
const user = require('./routes/user');
const Book = require('./routes/book');
const Favourites = require('./routes/favourite');
const Cart = require('./routes/cart');
const Order = require('./routes/order');
app.use(cors());
// Routes
app.use(express.json())


app.use("/api/v1", user);
app.use("/api/v1", Book);
app.use("/api/v1", Favourites);
app.use("/api/v1", Cart);
app.use("/api/v1", Order);


app.listen(process.env.PORT, (err) => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
