const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bycrypt = require('bcrypt');

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
        enum: {
            values: ['male', 'femlale', 'other'],
            message: '{VALUE} is not a valid gender'
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

userSchema.methods.getJwtToken = function () {
    const user = this;
    return jwt.sign({ _id: user._id }, 'dev_tinder_secret', {
        expiresIn: '1h',
    });
}

userSchema.methods.validatePassword = async function (password) {
    const user = this;

    const passwordHash = user.password;
    const isValid = await bycrypt.compare(password, passwordHash);
    return isValid
}

const User = mongoose.model("User", userSchema);

module.exports = User;