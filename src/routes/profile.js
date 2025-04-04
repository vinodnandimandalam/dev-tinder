const express = require('express');

const { validateProfile } = require('../utils/validations')
const { userAuth } = require('../middlewares/middlewares')
const validate = require('validator');

const profileRouter = express.Router();

//get profile
profileRouter.get('/profile/view', userAuth, async (req, res) => {
    try {
        const { user } = req
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

//edit profile
profileRouter.patch('/profile/edit', userAuth, async (req, res) => {
    try {
        if (!validateProfile(req)) {
            return res.status(400).json({ message: "Invalid fields" });
        }

        const loggedInUser = req.user;
        Object.keys(req.body).forEach((key) => {
            loggedInUser[key] = req.body[key];
        }
        );

        await loggedInUser.save();
        res.status(200).json(loggedInUser);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

//update profile password
profileRouter.patch('/profile/updatePassword', userAuth, (req, res) => {
    try {
        const { password } = req.body;
        if (!password) {
            return res.status(400).json({ message: "Password is required" });
        }
        if (!validate.isStrongPassword(password, { minLength: 6 })) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const loggedInUser = req.user;
        loggedInUser.password = password;
        loggedInUser.save();
        res.status(200).json(loggedInUser);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

module.exports = profileRouter;