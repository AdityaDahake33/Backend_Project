const Mongoose = require('mongoose');

const userSchema = new Mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase : true,
        minlength: [3, "Username must be at least 3 characters long"],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase : true,
        minlength: [15, "Email must be at least 15 characters long"],
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: [10, "Password must be at least 10 characters long"],
    }
})

const user = Mongoose.model('user', userSchema);

module.exports = user;