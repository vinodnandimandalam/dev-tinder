const adminAuth = (req, res, next) => {
    const isAdmin = req.params.id === "123";
    if (isAdmin) {
        next();
    } else {
        res.status(401).send("Unauthorized");
    }
}

module.exports = {
    adminAuth
}
