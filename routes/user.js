const express = require('express');
const router = express.Router();
const User = require('../model/user');

router.post('/add', (req, res) => {
    console.log(req.body.email)
    User.updateOne({email: req.body.email}, {$set:{stocks:req.body.stocks}}, {new: false}, (err, doc) => {
        if (err) {
            console.log("Something wrong when updating data!");
        }

        console.log(doc);
    });
    res.json("ok")
});

router.post('/login', (req, res) => {
    console.log(req.body.email)
    // Find user with requested email
    User.findOne({email: req.body.email}, (err, user) => {
        if (user === null) {
            return res.status(401).send({
                message: "User not found"
            });
        } else {
            if (user.validPassword(req.body.password)) {
                return res.status(200).send({
                    message: "User Logged In",
                })
            } else {
                return res.status(401).send({
                    message: "Wrong Password"
                });
            }
        }
    });
});

router.post('/signUp', (req, res) => {
    User.findOne({email: req.body.email}, (err, user) => {
        if (user !== null) {
            return res.status(409).send({
                message: "User already exists"
            });
        } else {
            // Creating empty user object
            let newUser = new User();

            // Initialize newUser object with request data
            newUser.firstName = req.body.firstName
            newUser.lastName = req.body.lastName
            newUser.email = req.body.email
            newUser.budget = req.body.budget
            newUser.country = req.body.country

            // Call setPassword function to hash password
            newUser.setPassword(req.body.password);
            // Save newUser object to database
            newUser.save((err, User) => {
                if (err) {
                    return res.status(500).send({
                        message: "Internal server error"
                    });
                } else {
                    return res.status(201).send({
                        message: "User added successfully"
                    });
                }
            });
        }
    });
});

router.get('/getUserByEmail/:email', (req, res) => {
    // Find user with requested email
    User.findOne({email: req.params.email}, {_id : 0, "__v" : 0, salt : 0, hash : 0}, (err, user) => {
        if (user === null) {
            return res.status(404).send({
                message: "User not found"
            });
        } else {
            return res.status(200).send({
                user
            })
        }
    });
});

module.exports = router;
