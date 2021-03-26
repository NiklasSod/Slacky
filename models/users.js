const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 12,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        hide: true
    },
    // isAdmin
    profilePhoto: {
        type: String,
        default: '/public/styles/svg/profile_pic.svg'
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model('User', UserSchema)
module.exports = User