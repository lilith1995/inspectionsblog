const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    place: {
        type: String,
        required: true
    },
    result: {
        type: String,
        required: true
    },
    city: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Post', postSchema);