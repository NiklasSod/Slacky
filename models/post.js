const mongoose = require('mongoose');
const moment = require('moment');

const postSchema = new mongoose.Schema({
    by: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 100,
    },
    content: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 1000,
    },
    date: {
        type: String,
        required: true,
        default: moment().format('MMMM Do YYYY, h:mm'),
    },
});

module.exports = mongoose.model('Post', postSchema);
