const mongoose = require('mongoose');

const channelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 100
    },
    description: {
        type: String
    },
    private: {
        type: Boolean,
        required: true,
        default: false
    },
    posts: []
});

module.exports = mongoose.model('Channel', channelSchema);