const express = require('express');
const requestRouter = express.Router();
const { userAuth } = require('../middlewares/middlewares')
const ConnectionRequest = require('../models/connectionRequest');
const User = require('../models/user');

// Send connection request
requestRouter.post('/sendConnectionRequest/:status/:id', userAuth, async (req, res) => {
    const { status, id } = req.params;
    const { _id: fromUserId } = req.user;

    const ALLOWED_STATUSES = ['ignore', 'interested'];
    if (!ALLOWED_STATUSES.includes(status)) {
        return res.status(400).send({ error: 'Invalid status' });
    }

    //See if user exists with the given id
    const existedUser = await User.findById(id);
    console.log('existed user', existedUser);
    if (!existedUser) {
        return res.status(404).send({ error: 'User not found' });
    }

    //Check if already connection request sent
    const existedConnectionRequest = await ConnectionRequest.findOne({
        $or: [
            { fromUserId, toUserId: id },
            { fromUserId: id, toUserId: fromUserId }
        ]
    });
    if (existedConnectionRequest) {
        return res.status(400).send({ error: 'Connection request already sent' });
    }

    try {
        const connectionRequest = await ConnectionRequest.create({
            fromUserId,
            toUserId: id,
            status
        });
        res.status(201).send({
            message: req.user.firstName + ' ' + req.user.lastName + ' sent a connection request to ' + existedUser.firstName + ' ' + existedUser.lastName,
            connectionRequest
        });
    } catch (error) {
        res.status(400).send(error);
    }
})

// Respond to connection request
requestRouter.post('/request/:status/:id', userAuth, async (req, res) => {
    const { status, id } = req.params;
    const { _id: toUserId, firstName, lastName } = req.user;

    try {
        // Check if status is valid
        const ALLOWED_STATUSES = ['accepted', 'rejected'];
        if (!ALLOWED_STATUSES.includes(status)) {
            return res.status(400).send({ error: 'Invalid status' });
        }

        // Check if request is valid
        const connectionRequest = await ConnectionRequest.findOne({
            _id: id,
            toUserId: toUserId,
            status: 'interested'
        })

        if (connectionRequest) {
            connectionRequest.status = status;
            await connectionRequest.save();

            return res.status(200).send({
                message: req.user.firstName + ' ' + req.user.lastName + ' ' + status + ' the connection request',
                connectionRequest
            });
        } else {
            return res.status(404).send({ error: 'Connection request not found' });
        }

    } catch (error) {
        return res.status(400).send({ error: error });
    }
})

module.exports = requestRouter;
