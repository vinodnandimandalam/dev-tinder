const express = require('express');
const requestRouter = express.Router();
const { userAuth } = require('../middlewares/middlewares')

requestRouter.post('/sendConnectionRequest', userAuth, async (req, res) => {
    const user = req.user;

    res.send(user.fistName + "sent connection request")
})

module.exports = requestRouter;