const express = require('express');
const userRouter = express.Router();
const { userAuth } = require('../middlewares/middlewares')
const ConnectionRequest = require('../models/connectionRequest');

const USER_SAFE_FIELDS = ['firstName', 'lastName', 'photoUrl', 'about', 'skills'];

// Get all pending requests of the logged in user
userRouter.get('/user/requests/received', userAuth, async (req, res) => {
    try {
        const loggedInUserId = req.user;
        const loggedInUserConnectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUserId._id,
            status: 'interested'
        }).populate('fromUserId', USER_SAFE_FIELDS);

        if (!loggedInUserConnectionRequests) {
            return res.status(404).send({ error: 'No connection requests found' });
        }

        res.status(200).send({
            message: 'Connection requests found',
            connectionRequests: loggedInUserConnectionRequests
        });

    } catch (error) {
        return res.status(400).send(error);
    }

});

userRouter.get('/user/connections', userAuth, async (req, res) => {
    try {
        const loggedUser = req.user;
        const loggedUserConnections = await ConnectionRequest.find({
            $or: [
                {
                    fromUserId: loggedUser._id,
                    status: 'accepted'
                },
                {
                    toUserId: loggedUser._id,
                    status: 'accepted'
                }
            ]
        }).populate('fromUserId', USER_SAFE_FIELDS)
            .populate('toUserId', USER_SAFE_FIELDS);


        const data = loggedUserConnections.map(eachConnection => {
            if (eachConnection.fromUserId._id.toString() === loggedUser._id.toString()) {
                return eachConnection.toUserId
            } else {
                return eachConnection.fromUserId
            }
        })

        return res.status(200).send({
            message: 'Connections found',
            connections: data
        })

    } catch (error) {
        return res.status(400).send({
            message: error.message
        })
    }
})

module.exports = userRouter;