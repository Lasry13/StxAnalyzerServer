const express = require('express');
const router = express.Router();
const User = require('../model/user');

router.post('/addStocks', (req, res) => {
    let sum = req.body.stocks.reduce((a, b) => a + b.close, 0)
    User.updateOne({email: req.body.email}, {$push:{stocks:req.body.stocks}, $inc: { budget: -sum} }, {new: false}, (err) => {
        if (err) {
            console.log("Something wrong when updating data!");
        }
    });
    res.json("ok")
});


module.exports = router;
