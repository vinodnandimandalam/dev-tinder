const validator = require('validator');

const validateSignup = (req) => {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
        return { error: 'All fields are required' };
    } else if (!validator.isEmail(email)) {
        return { error: 'Invalid email format' };
    }
    else if (!validator.isStrongPassword(password, { minLength: 6 })) {
        return { error: 'Invalid password' };
    }
}

const validateProfile = (req) => {
    const ALLOWED_FIELDS = [
        'firstName',
        'lastName',
        'photoUrl',
        'email',
        'skills',
        'age',
        'about',
    ]
    const data = req.body;
    const isEditAllowed = Object.keys(data).every((key) => {
        return ALLOWED_FIELDS.includes(key);
    });

    return isEditAllowed;
}

module.exports = {
    validateSignup,
    validateProfile
}