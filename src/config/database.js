const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://vinod:FyWp4veJxhJN9Ve9@namasthenode.s642n.mongodb.net/devtinder?retryWrites=true&w=majority&appName=NamastheNode');
    } catch (error) {
        console.log(error);
    }
}
module.exports = connectDB;