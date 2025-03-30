const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid");
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error("Password is not strong enough");
            }
        }
    },
    age: {
        type: Number,
        min: 18,
        max: 100
    },
    gender: {
        type: String,
        validate(value) {
            if (["male", "female", "others"].includes(value.toLowerCase())) {
                return true;
            } else {
                throw new Error("Gender not valid");
            }
        }
    },
    photoUrl: {
        type: String,
        default: "https://www.w3schools.com/howto/img_avatar.png",
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error("Photo URL is invalid");
            }
        }
    },
    about: {
        type: String,
        default: "No bio available",
    },
    skills: {
        type: [String],
    }
}, {
    timestamps: true,
})

const User = mongoose.model("User", userSchema);

module.exports = User;