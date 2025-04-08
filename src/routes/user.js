const express = require('express');
const userRouter = express.Router();
const { userAuth } = require('../middlewares/middlewares')
const ConnectionRequest = require('../models/connectionRequest');

// Get all pending requests of the logged in user
userRouter.get('/user/requests/received', userAuth, async (req, res) => {
    try {
        const loggedInUserId = req.user;
        const loggedInUserConnectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUserId._id,
            status: 'interested'
        }).populate('fromUserId', ['firstName', 'lastName', 'photoUrl', 'about', 'skills']);

        if (!loggedInUserConnectionRequests) {
            return res.status(404).send({ error: 'No connection requests found' });
        }

        res.status(200).send({
            message: 'Connection requests found',
            connectionRequests: loggedInUserConnectionRequests
        });

    } catch (error) {
        res.status(400).send(error);
    }

});

module.exports = userRouter;