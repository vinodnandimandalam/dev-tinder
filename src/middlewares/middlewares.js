const User = require("../models/user");
const jwt = require('jsonwebtoken');

const userAuth = async (req, res, next) => {
    try {
        const cookies = req.cookies;
        const { token } = cookies;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decodedToken = jwt.verify(token, "dev_tinder_secret");
        const user = await User.findById(decodedToken._id);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.user = user;
        next()
    } catch (error) {
        res.status(401).json({ message: "Unauthorized" });
    }
}

module.exports = {
    userAuth
}
