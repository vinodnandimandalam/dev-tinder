const express = require('express');
const connectDB = require('./config/database')
const cookieParser = require('cookie-parser');

const app = express()
app.use(express.json());
app.use(cookieParser());

const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');

app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requestRouter);


// //get user
// app.get('/user', userAuth, async (req, res) => {
//     try {
//         const user = await User.find({
//             email:
//                 req.body.email
//         });
//         if (user.length === 0) {
//             return res.status(404).json({ message: "User not found" });
//         }
//         res.status(200).json(user);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// }
// )

// // Feed api
// app.get('/feed', userAuth, async (req, res) => {
//     try {
//         const users = await User.find();
//         res.status(200).json(users);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// }
// )

// //get user by email
// app.get('/user/:email', userAuth, async (req, res) => {
//     try {
//         const user = await User.findOne({ email: req.params.email });
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }
//         res.status(200).json(user);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// }
// )

// //delete user by id
// app.delete('/user/:id', userAuth, async (req, res) => {
//     try {
//         await User.findByIdAndDelete(req.params.id);
//         res.status(200).json({ message: "User deleted successfully" });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// })

// //update user by id
// app.patch('/user/:id', userAuth, async (req, res) => {
//     try {
//         const userId = req.params.id;
//         const data = req.body;
//         const UPDATE_ALLOWED_FIELDS = ['skills', 'age', 'about', 'password']
//         const isValidUpdate = Object.keys(data).every((key) => {
//             return UPDATE_ALLOWED_FIELDS.includes(key);
//         });
//         if (!isValidUpdate) {
//             return res.status(400).json({ message: "Invalid update fields" });
//         }
//         await User.findByIdAndUpdate(userId, data, {
//             new: true,
//             runValidators: true // to ensure the updated data is validated against the schema
//         });
//         const updatedUser = await User.findById(userId);
//         if (!updatedUser) {
//             return res.status(404).json({ message: "User not found" });
//         }
//         res.status(200).json(updatedUser);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// })




connectDB().then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => {
        console.log("server listening on 3000")
    });
}).catch((err) => {
    console.log(err);
})