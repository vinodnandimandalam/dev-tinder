const express = require('express');
const bycrypt = require('bcrypt');
const { validateSignup } = require('../utils/validations')
const User = require('../models/user');
const e = require('express');

const authRouter = express.Router();

//User signup
authRouter.post('/signup', async (req, res) => {
    try {
        // Validate the request body
        validateSignup(req);

        const { firstName, lastName, email, password } = req.body;

        //Encrypt password
        const saltRounds = 10;
        const hashedPassword = await bycrypt.hash(password, saltRounds);

        const user = new User({
            firstName, lastName, email, password: hashedPassword,
        });
        const savedUser = await user.save();
        res.status(201).json(savedUser);

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}
)

//user login
authRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isMatch = await user.validatePassword(password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = await user.getJwtToken();
        res.cookie('token', token);
        res.status(200).json(user);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
)

//User logout
authRouter.post('/logout', async (req, res) => {
    res.cookie('token', null, expires = new Date(Date.now()));
    res.status(200).json({ message: "Logged out successfully" });
}
)

module.exports = authRouter;
